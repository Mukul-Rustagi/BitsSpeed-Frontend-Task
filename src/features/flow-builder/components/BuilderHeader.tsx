interface BuilderHeaderProps {
  title: string
  onSave: () => void
}

function BuilderHeader({ title, onSave }: BuilderHeaderProps) {
  return (
    <header className="top-bar">
      <h1 className="top-bar__title">{title}</h1>
      <button className="save-button" type="button" onClick={onSave}>
        Save Changes
      </button>
    </header>
  )
}

export default BuilderHeader
