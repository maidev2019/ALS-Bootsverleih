function createImageItem(file) {
  return {
    id: crypto.randomUUID(),
    file,
    previewUrl: URL.createObjectURL(file),
  };
}

export default function ImageUploader({ images, setFormData }) {
  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files || []);
    if (selectedFiles.length === 0) return;

    const newImages = selectedFiles.map(createImageItem);

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...newImages],
    }));

    event.target.value = "";
  };

  const removeImage = (id) => {
    setFormData((prev) => {
      const imageToRemove = prev.images.find((image) => image.id === id);
      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.previewUrl);
      }

      return {
        ...prev,
        images: prev.images.filter((image) => image.id !== id),
      };
    });
  };

  return (
    <section className="form-section">
      <h2>Bilder</h2>

      <div className="section-content">
        <div className="field">
          <label htmlFor="image-upload">Bilder hinzufügen</label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />
        </div>

        {images.length > 0 && (
          <div className="image-grid">
            {images.map((image, index) => (
              <div key={image.id} className="image-card">
                <img
                  src={image.previewUrl}
                  alt={`Hochgeladenes Bild ${index + 1}`}
                  className="image-preview"
                />

                <div className="image-card-footer">
                  <span>Bild {index + 1}</span>
                  <button
                    type="button"
                    className="danger-button"
                    onClick={() => removeImage(image.id)}
                  >
                    Entfernen
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}