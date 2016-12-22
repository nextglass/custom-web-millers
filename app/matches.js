if ('Element' in global && !Element.prototype.matches) {
  if (Element.prototype.msMatchesSelector) {
    Element.prototype.matches = Element.prototype.msMatchesSelector;
  } else if (Element.prototype.oMatchesSelector) {
    Element.prototype.matches = Element.prototype.oMatchesSelector;
  } else if (Element.prototype.mozMatchesSelector) {
    Element.prototype.matches = Element.prototype.mozMatchesSelector;
  } else if (Element.prototype.webkitMatchesSelector) {
    Element.prototype.matches = Element.prototype.webkitMatchesSelector;
  } else if (document.querySelectorAll) {
    Element.prototype.matches = function matches(selector) {
      var matches = (this.document || this.ownerDocument).querySelectorAll(selector),
          i = matches.length;
      while (--i >= 0 && matches.item(i) !== this) {}
      return i > -1;
    };
  }
}
