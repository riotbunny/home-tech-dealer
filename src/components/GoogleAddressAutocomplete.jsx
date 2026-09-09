import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useMapsLibrary } from '@vis.gl/react-google-maps';
import { MapPin, Search, X, Loader2 } from 'lucide-react';

/**
 * GoogleAddressAutocomplete
 * High-performance address autocomplete bar powered by Google Maps Platform Places API.
 * Adheres to Zero-Legacy Google Maps Platform guidelines with session token management.
 */
export function GoogleAddressAutocomplete({
  value = '',
  onChange,
  onSelectAddress,
  placeholder = 'Enter street address, city, or zip code...',
  className = '',
  inputClassName = '',
  autoFocus = false
}) {
  const placesLib = useMapsLibrary('places');
  const [inputValue, setInputValue] = useState(value);
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isFocused, setIsFocused] = useState(false);
  const [dropdownMaxHeight, setDropdownMaxHeight] = useState(260);

  const containerRef = useRef(null);
  const sessionTokenRef = useRef(null);
  const autocompleteServiceRef = useRef(null);
  const debounceTimerRef = useRef(null);

  // Synchronize external value prop
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // Dynamically calculate available height above virtual keyboard on mobile
  useEffect(() => {
    const handleViewportChange = () => {
      if (!containerRef.current || !isOpen) return;

      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.visualViewport ? window.visualViewport.height : window.innerHeight;
      
      const availableBelow = viewportHeight - rect.bottom - 14;
      
      if (availableBelow > 130) {
        setDropdownMaxHeight(Math.min(availableBelow, 360));
      } else {
        setDropdownMaxHeight(Math.max(180, availableBelow));
      }
    };

    if (typeof window !== 'undefined' && window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleViewportChange);
      window.visualViewport.addEventListener('scroll', handleViewportChange);
    }
    window.addEventListener('resize', handleViewportChange);

    handleViewportChange();

    return () => {
      if (typeof window !== 'undefined' && window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleViewportChange);
        window.visualViewport.removeEventListener('scroll', handleViewportChange);
      }
      window.removeEventListener('resize', handleViewportChange);
    };
  }, [isOpen]);

  // Smoothly scroll address bar to top of viewport on mobile when keyboard appears
  const scrollToOptimalPosition = () => {
    if (typeof window === 'undefined') return;
    
    if (window.innerWidth < 768 && containerRef.current) {
      setTimeout(() => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const headerOffset = 66;
        const targetY = window.pageYOffset + rect.top - headerOffset - 8;
        
        window.scrollTo({
          top: Math.max(0, targetY),
          behavior: 'smooth'
        });
      }, 220);
    }
  };

  // Safe Session Token Initialization (No Infinite Loop!)
  useEffect(() => {
    if (placesLib?.AutocompleteSessionToken && !sessionTokenRef.current) {
      sessionTokenRef.current = new placesLib.AutocompleteSessionToken();
    }
  }, [placesLib]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fallback to Classic AutocompleteService
  const fallbackClassicAutocomplete = useCallback((query) => {
    if (!placesLib?.AutocompleteService) {
      setIsLoading(false);
      return;
    }

    if (!autocompleteServiceRef.current) {
      autocompleteServiceRef.current = new placesLib.AutocompleteService();
    }

    autocompleteServiceRef.current.getPlacePredictions(
      {
        input: query,
        componentRestrictions: { country: 'us' }
      },
      (predictions, status) => {
        setIsLoading(false);
        if (status === placesLib.PlacesServiceStatus?.OK && predictions && predictions.length > 0) {
          const formatted = predictions.map((p) => ({
            placeId: p.place_id,
            description: p.description,
            mainText: p.structured_formatting?.main_text || p.description,
            secondaryText: p.structured_formatting?.secondary_text || ''
          }));
          setSuggestions(formatted);
          setIsOpen(true);
        } else {
          setSuggestions([]);
          setIsOpen(false);
        }
      }
    );
  }, [placesLib]);

  // Fetch suggestions using Google Places API (Modern + Classic Fallback)
  const fetchSuggestions = useCallback((query) => {
    if (!query || query.trim().length < 2) {
      setSuggestions([]);
      setIsOpen(false);
      setIsLoading(false);
      return;
    }

    if (!placesLib) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    // 1. Try modern AutocompleteSuggestion (Places API New)
    if (placesLib.AutocompleteSuggestion?.fetchAutocompleteSuggestions) {
      placesLib.AutocompleteSuggestion.fetchAutocompleteSuggestions({
        input: query,
        sessionToken: sessionTokenRef.current,
        includedRegionCodes: ['us']
      })
        .then((response) => {
          setIsLoading(false);
          if (response && response.suggestions && response.suggestions.length > 0) {
            const formatted = response.suggestions.map((s) => {
              const pred = s.placePrediction;
              return {
                placeId: pred?.placeId,
                description: pred?.text?.text || '',
                mainText: pred?.structuredFormat?.mainText?.text || pred?.text?.text || '',
                secondaryText: pred?.structuredFormat?.secondaryText?.text || '',
                toPlace: () => pred?.toPlace?.()
              };
            });
            setSuggestions(formatted);
            setIsOpen(true);
          } else {
            fallbackClassicAutocomplete(query);
          }
        })
        .catch(() => {
          fallbackClassicAutocomplete(query);
        });
    } else {
      fallbackClassicAutocomplete(query);
    }
  }, [placesLib, fallbackClassicAutocomplete]);

  // Debounced input change (300ms delay to prevent API quota spam & infinite loops)
  const handleInputChange = (e) => {
    const val = e.target.value;
    setInputValue(val);
    if (onChange) onChange(val);

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (val.trim().length < 2) {
      setSuggestions([]);
      setIsOpen(false);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    debounceTimerRef.current = setTimeout(() => {
      fetchSuggestions(val);
    }, 300);
  };

  // Handle selecting an autocomplete suggestion
  const handleSelectSuggestion = (item) => {
    const chosenAddress = item.description;
    setInputValue(chosenAddress);
    setSuggestions([]);
    setIsOpen(false);
    setActiveIndex(-1);

    if (onChange) onChange(chosenAddress);
    if (onSelectAddress) onSelectAddress(chosenAddress);

    // Refresh session token for subsequent searches
    if (placesLib?.AutocompleteSessionToken) {
      sessionTokenRef.current = new placesLib.AutocompleteSessionToken();
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (!isOpen || suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === 'Enter') {
      if (activeIndex >= 0 && activeIndex < suggestions.length) {
        e.preventDefault();
        handleSelectSuggestion(suggestions[activeIndex]);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setActiveIndex(-1);
    }
  };

  return (
    <div className={`relative w-full ${className}`} ref={containerRef}>
      <div className="relative flex items-center w-full">
        {/* Left Icon (MapPin or Spinner) */}
        <div className="absolute left-4 z-10 flex items-center pointer-events-none text-slate-400">
          {isLoading ? (
            <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
          ) : (
            <MapPin className="w-5 h-5 text-blue-600" />
          )}
        </div>

        {/* Input Element */}
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            setIsFocused(true);
            scrollToOptimalPosition();
            if (suggestions.length > 0) setIsOpen(true);
          }}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          autoComplete="off"
          spellCheck="false"
          className={`w-full pl-12 pr-10 py-3.5 bg-white border border-slate-200 rounded-2xl text-slate-900 placeholder:text-slate-400 font-medium shadow-sm focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all ${inputClassName}`}
        />

        {/* Clear Button */}
        {inputValue && (
          <button
            type="button"
            onClick={() => {
              setInputValue('');
              setSuggestions([]);
              setIsOpen(false);
              if (onChange) onChange('');
            }}
            className="absolute right-4 z-10 p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Autocomplete Dropdown List */}
      {isOpen && suggestions.length > 0 && (
        <ul
          className="absolute z-50 left-0 right-0 mt-2 bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-y-auto divide-y divide-slate-100 animate-fade-in"
          style={{ maxHeight: `${dropdownMaxHeight}px` }}
        >
          {suggestions.map((item, idx) => (
            <li
              key={item.placeId || idx}
              onClick={() => handleSelectSuggestion(item)}
              onMouseEnter={() => setActiveIndex(idx)}
              className={`px-4 py-3.5 flex items-start gap-3 cursor-pointer transition-colors ${
                activeIndex === idx ? 'bg-blue-50/80 text-blue-900' : 'hover:bg-slate-50 text-slate-700'
              }`}
            >
              <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-1" />
              <div className="flex-1 min-w-0">
                <div className="font-bold text-sm text-slate-900 truncate">
                  {item.mainText}
                </div>
                {item.secondaryText && (
                  <div className="text-xs text-slate-500 truncate">
                    {item.secondaryText}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
