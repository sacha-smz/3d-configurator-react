const container = document.getElementById("admin-nav");

function AdminNav() {
  const currentDomain = container.dataset.currentDomain;

  const links = [
    { url: "/", label: <i className="fas fa-home"></i> },
    { url: "/admin/frames", label: "Montures" },
    { url: "/admin/textures", label: "Textures" }
  ].map((link) => (
    <li key={link.url} className={link.label === currentDomain ? "active" : ""}>
      <a href={link.url}>{link.label}</a>
    </li>
  ));

  return <ul>{links}</ul>;
}

ReactDOM.render(<AdminNav />, container);
