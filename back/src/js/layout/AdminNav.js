const container = document.getElementById("admin-nav");

function AdminNav() {
  const currentLink = container.dataset.currentLink;
  console.log(currentLink);

  const links = [
    { url: "/", label: <i className="fas fa-home"></i> },
    { url: "frames", label: "Montures" },
    { url: "textures", label: "Textures" }
  ].map((link) => (
    <li key={link.url} className={link.url === currentLink ? "active" : ""}>
      <a href={link.url}>{link.label}</a>
    </li>
  ));

  return <ul>{links}</ul>;
}

ReactDOM.render(<AdminNav />, container);
