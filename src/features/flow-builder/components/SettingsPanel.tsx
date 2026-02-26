interface SettingsPanelProps {
  nodeText: string
  onBack: () => void
  onTextChange: (newText: string) => void
}

function SettingsPanel({ nodeText, onBack, onTextChange }: SettingsPanelProps) {
  return (
    <section className="panel">
      <div className="settings-header">
        <button className="back-button" type="button" onClick={onBack} aria-label="Back to nodes panel">
          {'<'}
        </button>
        <h2 className="panel__title">Message</h2>
      </div>

      <label className="settings-label" htmlFor="message-text">
        Text
      </label>
      <textarea
        id="message-text"
        className="settings-input"
        value={nodeText}
        onChange={(event) => onTextChange(event.target.value)}
        rows={7}
      />
    </section>
  )
}

export default SettingsPanel
