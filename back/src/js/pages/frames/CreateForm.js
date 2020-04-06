const container = document.getElementById("frame-create-form");

function CreateForm() {
  return (
    <form action="/admin/frames/create" method="POST" encType="multipart/form-data">
      <label htmlFor="ref">Référence: </label>
      <input type="text" id="ref" name="ref" />
      <label htmlFor="name">Nom: </label>
      <input type="text" id="name" name="name" />
      <label htmlFor="price">Prix: </label>
      <input type="number" id="price" name="price" step="any" />

      <input type="file" name="file" id="file" />

      <input type="submit" value="Valider" />
    </form>
  );
}

ReactDOM.render(<CreateForm />, container);
