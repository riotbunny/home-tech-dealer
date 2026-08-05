import React, { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalPath: string;
  ogType?: string;
  schema?: Record<string, any> | Record<string, any>[];
}

export default function SEOHead({
  title,
  description,
  canonicalPath,
  ogType = 'website',
  schema
}: SEOHeadProps) {
  useEffect(() => {
    // Set Title
    document.title = title;

    // Helper to update or create meta tags
    const setMetaTag = (selector: string, key: string, value: string, attr: string = 'name') => {
      let element = document.querySelector(selector) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, key);
        document.head.appendChild(element);
      }
      element.setAttribute('content', value);
    };

    // Helper for Link tags (Canonical)
    const setLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // Meta Descriptions
    setMetaTag('meta[name="description"]', 'description', description);

    // OpenGraph
    const cleanCanonical = `https://www.hometechdealer.com${canonicalPath.split('?')[0]}`;
    setMetaTag('meta[property="og:title"]', 'og:title', title, 'property');
    setMetaTag('meta[property="og:description"]', 'og:description', description, 'property');
    setMetaTag('meta[property="og:url"]', 'og:url', cleanCanonical, 'property');
    setMetaTag('meta[property="og:type"]', 'og:type', ogType, 'property');

    // Canonical Tag (Stripped of query strings)
    setLinkTag('canonical', cleanCanonical);

    // JSON-LD Schema
    let scriptTag = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
    if (schema) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.setAttribute('type', 'application/ld+json');
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(schema);
    } else if (scriptTag) {
      scriptTag.remove();
    }
  }, [title, description, canonicalPath, schema, ogType]);

  return null;
}