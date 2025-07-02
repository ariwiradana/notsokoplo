export function scrollToId(id: string, behavior: ScrollBehavior = "smooth") {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior });
  } else {
    console.warn(`Element with ID "${id}" not found.`);
  }

  if (history.replaceState) {
    const newUrl = window.location.pathname + window.location.search;
    history.replaceState(null, "", newUrl);
  }
}
