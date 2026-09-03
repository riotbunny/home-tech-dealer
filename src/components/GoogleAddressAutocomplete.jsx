import React, { useState, useEffect, useRef } from 'react';
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
      
      // Calculate remaining visible space between bottom of input and virtual keyboard
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
        const headerOffset = 66; // Sticky header clearance
        const targetY = window.pageYOffset + rect.top - headerOffset - 8;
        
        window.scrollTo({
          top: Math.max(0, targetY),
          behavior: 'smooth'
        });
      }, 220); // 220ms matches keyboard slide-in duration
    }
  };

  // Initialize session token when places library is available
  useEffect(() => {
    if (placesLib?.AutocompleteSessionToken) {
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

  // Fetch suggestions using Google Places API (New & Classic Service fallback)
  const fetchSuggestions = (query) => {
    if (!query || query.trim().length < 2) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    if (!placesLib) {
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
  };

  // Fallback to AutocompleteService (for projects where Places API New is not yet activated)
  const fallbackClassicAutocomplete = (query) => {
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
        if (status === placesLib.PlacesServiceStatus?.OK && predictions) {
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
        }
      }
    );
  };

  // Debounced input change
  const handleInputChange = (e) => {
    const val = e.target.value;
    setInputValue(val);
    if (onChange) onChange(val);

    // Debounce search query to avoid quota spam
    fetchSuggestions(val);
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
    }
  };

  const handleClear = () => {
    setInputValue('');
    setSuggestions([]);
    setIsOpen(false);
    if (onChange) onChange('');
  };

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      <div className="relative w-full">
        <MapPin className="absolute left-4 top-3.5 w-5 h-5 text-blue-600 pointer-events-none" />
        
        <input
          type="text"
          inputMode="search"
          enterKeyHint="search"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            setIsFocused(true);
            if (suggestions.length > 0) setIsOpen(true);
            scrollToOptimalPosition();
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className={`w-full pl-12 pr-10 py-3.5 bg-slate-50 border border-slate-300 rounded-2xl text-slate-900 placeholder-slate-400 text-base sm:text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 font-medium transition-all ${
            isFocused ? 'ring-2 ring-blue-500/25 border-blue-600 bg-white shadow-md' : ''
          } ${inputClassName}`}
        />

        {/* Right side loader / clear */}
        <div className="absolute right-3 top-3 flex items-center gap-1.5">
          {isLoading && (
            <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
          )}
          {inputValue && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
              title="Clear input"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Google Places Dropdown Predictions with Dynamic Keyboard-Safe Max Height */}
      {isOpen && suggestions.length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-2 z-50 bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden animate-fade-in divide-y divide-slate-100">
          <div 
            className="overflow-y-auto overscroll-contain transition-all"
            style={{ maxHeight: `${dropdownMaxHeight}px` }}
          >
            {suggestions.map((item, index) => {
              const isSelected = index === activeIndex;
              return (
                <button
                  key={item.placeId || index}
                  type="button"
                  onClick={() => handleSelectSuggestion(item)}
                  className={`w-full text-left px-4 py-3 flex items-start gap-3 transition-colors ${
                    isSelected ? 'bg-blue-50 text-blue-900' : 'hover:bg-slate-50 text-slate-800'
                  }`}
                >
                  <div className="w-8 h-8 rounded-xl bg-blue-100/70 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-slate-900 truncate">
                      {item.mainText}
                    </div>
                    {item.secondaryText && (
                      <div className="text-[11px] text-slate-500 truncate">
                        {item.secondaryText}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Google Attribution Strip (ToS Compliance) */}
          <div className="px-4 py-2 bg-slate-50 flex items-center justify-between text-[10px] text-slate-400">
            <span className="flex items-center gap-1">
              <span>Suggestions powered by</span>
              <span className="font-semibold text-slate-600">Google Places</span>
            </span>
            <span className="text-[10px] text-slate-400">United States</span>
          </div>
        </div>
      )}
    </div>
  );
}
