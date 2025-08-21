export function scrollToId(id: string, behavior: ScrollBehavior = "smooth") {
  const element = document.getElementById(id);
  if (element) {
    const y = element.getBoundingClientRect().top + window.pageYOffset - 30;
    window.scrollTo({ top: y, behavior: "smooth" });
  } else {
    console.warn(`Element with ID "${id}" not found.`);
  }

  if (history.replaceState) {
    const newUrl = window.location.pathname + window.location.search;
    history.replaceState(null, "", newUrl);
  }
}
