const container = document.getElementById("texture-create-form");

function CreateForm() {
  return (
    <form action="/admin/textures/create" method="POST" encType="multipart/form-data">
      <label htmlFor="ref">Référence: </label>
      <input type="text" id="ref" name="ref" autoComplete="on" />
      <label htmlFor="name">Nom: </label>
      <input type="text" id="name" name="name" autoComplete="on" />

      <input type="file" name="img" id="img" />

      <input type="submit" value="Valider" />
    </form>
  );
}

ReactDOM.render(<CreateForm />, container);
