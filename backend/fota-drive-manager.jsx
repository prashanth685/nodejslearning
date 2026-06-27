import { useState, useRef, useCallback, useEffect } from "react";

const CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID";
const API_KEY = "YOUR_GOOGLE_API_KEY";
const SCOPES = "https://www.googleapis.com/auth/drive";
const TARGET_FOLDER_ID = "1r4e-6gjIITbff9iqyKPtaAfx29KkmriY";

const STEPS = ["Select File", "Choose Folder", "Upload", "Done"];

function StepBar({ current }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: "2rem" }}>
      {STEPS.map((s, i) => (
        <div key={s} style={{ display: "flex", alignItems: "center", flex: i < STEPS.length - 1 ? 1 : 0 }}>
          <div style={{
            display: "flex", flexDirection: "column", alignItems: "center", gap: 4
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
              background: i < current ? "var(--color-background-success)" : i === current ? "#185FA5" : "var(--color-background-secondary)",
              border: i === current ? "2px solid #185FA5" : "0.5px solid var(--color-border-tertiary)",
              color: i < current ? "var(--color-text-success)" : i === current ? "#fff" : "var(--color-text-secondary)",
              fontWeight: 500, fontSize: 13, transition: "all 0.2s"
            }}>
              {i < current ? <i className="ti ti-check" style={{ fontSize: 16 }} aria-hidden="true" /> : i + 1}
            </div>
            <span style={{ fontSize: 11, color: i === current ? "#185FA5" : "var(--color-text-secondary)", fontWeight: i === current ? 500 : 400, whiteSpace: "nowrap" }}>{s}</span>
          </div>
          {i < STEPS.length - 1 && (
            <div style={{ flex: 1, height: 2, background: i < current ? "var(--color-background-success)" : "var(--color-border-tertiary)", margin: "0 8px", marginBottom: 20, transition: "background 0.3s" }} />
          )}
        </div>
      ))}
    </div>
  );
}

function FileDropZone({ file, onFile }) {
  const [drag, setDrag] = useState(false);
  const inputRef = useRef();
  const onDrop = (e) => { e.preventDefault(); setDrag(false); const f = e.dataTransfer.files[0]; if (f) onFile(f); };
  return (
    <div
      onClick={() => inputRef.current.click()}
      onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
      onDragLeave={() => setDrag(false)}
      onDrop={onDrop}
      style={{
        border: `2px dashed ${drag ? "#185FA5" : "var(--color-border-secondary)"}`,
        borderRadius: "var(--border-radius-lg)", padding: "2.5rem 1.5rem", textAlign: "center",
        cursor: "pointer", background: drag ? "var(--color-background-info)" : "var(--color-background-secondary)",
        transition: "all 0.2s"
      }}>
      <input ref={inputRef} type="file" style={{ display: "none" }} onChange={e => e.target.files[0] && onFile(e.target.files[0])} />
      <i className="ti ti-upload" style={{ fontSize: 36, color: "#185FA5", display: "block", marginBottom: 12 }} aria-hidden="true" />
      <p style={{ margin: 0, fontWeight: 500, color: "var(--color-text-primary)" }}>Drop firmware file here</p>
      <p style={{ margin: "4px 0 0", fontSize: 13, color: "var(--color-text-secondary)" }}>or click to browse · .bin, .hex, .zip, .img supported</p>
      {file && (
        <div style={{ marginTop: 16, padding: "10px 16px", background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: "var(--border-radius-md)", display: "inline-flex", alignItems: "center", gap: 8 }}>
          <i className="ti ti-file" style={{ fontSize: 18, color: "#185FA5" }} aria-hidden="true" />
          <span style={{ fontWeight: 500, fontSize: 14 }}>{file.name}</span>
          <span style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>({(file.size / 1024).toFixed(1)} KB)</span>
        </div>
      )}
    </div>
  );
}

function FolderPicker({ token, onSelect, selectedFolder }) {
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState("existing");
  const [newName, setNewName] = useState("");
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    fetch(`https://www.googleapis.com/drive/v3/files?q='${TARGET_FOLDER_ID}'+in+parents+and+mimeType='application/vnd.google-apps.folder'+and+trashed=false&fields=files(id,name,modifiedTime)&orderBy=name`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => r.json())
      .then(d => { setFolders(d.files || []); setLoading(false); })
      .catch(() => { setError("Could not load folders."); setLoading(false); });
  }, [token]);

  const createFolder = async () => {
    if (!newName.trim()) return;
    setCreating(true); setError("");
    try {
      const res = await fetch("https://www.googleapis.com/drive/v3/files", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName.trim(), mimeType: "application/vnd.google-apps.folder", parents: [TARGET_FOLDER_ID] })
      });
      const f = await res.json();
      if (f.id) { setFolders(prev => [...prev, f]); onSelect({ id: f.id, name: f.name }); setMode("existing"); }
    } catch { setError("Failed to create folder."); }
    setCreating(false);
  };

  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {["existing", "new"].map(m => (
          <button key={m} onClick={() => setMode(m)} style={{
            padding: "8px 20px", borderRadius: "var(--border-radius-md)", fontSize: 14, fontWeight: mode === m ? 500 : 400,
            background: mode === m ? "#185FA5" : "var(--color-background-secondary)",
            color: mode === m ? "#fff" : "var(--color-text-primary)",
            border: mode === m ? "none" : "0.5px solid var(--color-border-secondary)", cursor: "pointer"
          }}>
            <i className={`ti ti-${m === "existing" ? "folder" : "folder-plus"}`} style={{ marginRight: 6 }} aria-hidden="true" />
            {m === "existing" ? "Use existing folder" : "Create new folder"}
          </button>
        ))}
      </div>

      {mode === "new" ? (
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input
            type="text" placeholder="Company folder name (e.g. Acme Corp)" value={newName}
            onChange={e => setNewName(e.target.value)}
            onKeyDown={e => e.key === "Enter" && createFolder()}
            style={{ flex: 1, padding: "10px 14px", borderRadius: "var(--border-radius-md)", border: "0.5px solid var(--color-border-secondary)", fontSize: 14, background: "var(--color-background-primary)", color: "var(--color-text-primary)" }}
          />
          <button onClick={createFolder} disabled={creating || !newName.trim()} style={{
            padding: "10px 20px", borderRadius: "var(--border-radius-md)", background: "#185FA5", color: "#fff",
            border: "none", fontWeight: 500, cursor: "pointer", opacity: creating || !newName.trim() ? 0.6 : 1
          }}>
            {creating ? "Creating…" : "Create"}
          </button>
        </div>
      ) : loading ? (
        <p style={{ color: "var(--color-text-secondary)", fontSize: 14 }}>Loading folders…</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 10 }}>
          {folders.length === 0 && <p style={{ color: "var(--color-text-secondary)", fontSize: 14, gridColumn: "1/-1" }}>No company folders yet. Create one above.</p>}
          {folders.map(f => (
            <div key={f.id} onClick={() => onSelect(f)} style={{
              padding: "12px 14px", borderRadius: "var(--border-radius-md)", cursor: "pointer",
              border: selectedFolder?.id === f.id ? "2px solid #185FA5" : "0.5px solid var(--color-border-tertiary)",
              background: selectedFolder?.id === f.id ? "var(--color-background-info)" : "var(--color-background-primary)",
              display: "flex", alignItems: "center", gap: 10, transition: "all 0.15s"
            }}>
              <i className="ti ti-folder" style={{ fontSize: 22, color: "#185FA5" }} aria-hidden="true" />
              <span style={{ fontSize: 13, fontWeight: 500, wordBreak: "break-word" }}>{f.name}</span>
            </div>
          ))}
        </div>
      )}
      {error && <p style={{ color: "var(--color-text-danger)", fontSize: 13, marginTop: 8 }}>{error}</p>}
    </div>
  );
}

function ProgressBar({ value }) {
  return (
    <div style={{ background: "var(--color-background-secondary)", borderRadius: 6, height: 10, overflow: "hidden", marginTop: 8 }}>
      <div style={{ height: "100%", background: "#185FA5", width: `${value}%`, borderRadius: 6, transition: "width 0.2s" }} />
    </div>
  );
}

export default function FotaManager() {
  const [step, setStep] = useState(0);
  const [file, setFile] = useState(null);
  const [token, setToken] = useState(null);
  const [folder, setFolder] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [error, setError] = useState("");
  const [signing, setSigning] = useState(false);
  const [copied, setCopied] = useState(false);
  const tokenClient = useRef(null);

  useEffect(() => {
    const script1 = document.createElement("script");
    script1.src = "https://accounts.google.com/gsi/client";
    script1.async = true; script1.defer = true;
    document.head.appendChild(script1);
    script1.onload = () => {
      tokenClient.current = window.google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: (resp) => {
          if (resp.access_token) { setToken(resp.access_token); setSigning(false); }
          else { setError("Sign-in failed or cancelled."); setSigning(false); }
        }
      });
    };
    return () => document.head.removeChild(script1);
  }, []);

  const signIn = () => {
    setError(""); setSigning(true);
    if (tokenClient.current) tokenClient.current.requestAccessToken();
    else { setError("Google SDK not ready yet. Try again."); setSigning(false); }
  };

  const uploadFile = useCallback(async () => {
    if (!file || !folder || !token) return;
    setError(""); setProgress(0);

    const metadata = { name: file.name, parents: [folder.id] };
    const form = new FormData();
    form.append("metadata", new Blob([JSON.stringify(metadata)], { type: "application/json" }));
    form.append("file", file);

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,webContentLink");
      xhr.setRequestHeader("Authorization", `Bearer ${token}`);
      xhr.upload.onprogress = e => { if (e.lengthComputable) setProgress(Math.round((e.loaded / e.total) * 90)); };
      xhr.onload = async () => {
        if (xhr.status === 200) {
          const f = JSON.parse(xhr.responseText);
          await fetch(`https://www.googleapis.com/drive/v3/files/${f.id}/permissions`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
            body: JSON.stringify({ role: "reader", type: "anyone" })
          });
          setProgress(100);
          const dl = `https://drive.google.com/uc?export=download&id=${f.id}`;
          setUploadedFile(f);
          setDownloadUrl(dl);
          resolve(f);
        } else { reject(new Error("Upload failed: " + xhr.responseText)); }
      };
      xhr.onerror = () => reject(new Error("Network error"));
      xhr.send(form);
    });
  }, [file, folder, token]);

  const handleUpload = async () => {
    setStep(2);
    try {
      await uploadFile();
      setStep(3);
    } catch (e) {
      setError(e.message);
      setStep(1);
    }
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(downloadUrl);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const reset = () => { setStep(0); setFile(null); setFolder(null); setProgress(0); setUploadedFile(null); setDownloadUrl(""); setError(""); };

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: "2rem 1rem", fontFamily: "var(--font-sans)" }}>
      <h2 className="sr-only">FOTA Firmware Manager</h2>

      <div style={{ marginBottom: "1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <i className="ti ti-cpu" style={{ fontSize: 28, color: "#185FA5" }} aria-hidden="true" />
          <div>
            <h1 style={{ margin: 0, fontSize: 22, fontWeight: 500 }}>FOTA Firmware Manager</h1>
            <p style={{ margin: 0, fontSize: 13, color: "var(--color-text-secondary)" }}>Upload firmware to Google Drive · Generate direct download links</p>
          </div>
          {!token ? (
            <button onClick={signIn} disabled={signing} style={{
              marginLeft: "auto", padding: "9px 18px", borderRadius: "var(--border-radius-md)",
              background: "#185FA5", color: "#fff", border: "none", fontWeight: 500, cursor: "pointer",
              display: "flex", alignItems: "center", gap: 6, opacity: signing ? 0.7 : 1
            }}>
              <i className="ti ti-brand-google" style={{ fontSize: 16 }} aria-hidden="true" />
              {signing ? "Signing in…" : "Sign in with Google"}
            </button>
          ) : (
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", background: "var(--color-background-success)", borderRadius: "var(--border-radius-md)" }}>
              <i className="ti ti-circle-check" style={{ fontSize: 16, color: "var(--color-text-success)" }} aria-hidden="true" />
              <span style={{ fontSize: 13, color: "var(--color-text-success)", fontWeight: 500 }}>Connected</span>
            </div>
          )}
        </div>
      </div>

      {!token && (
        <div style={{ padding: "1rem 1.25rem", background: "var(--color-background-info)", border: "0.5px solid var(--color-border-info)", borderRadius: "var(--border-radius-md)", marginBottom: "1.5rem", fontSize: 14, color: "var(--color-text-info)" }}>
          <i className="ti ti-info-circle" style={{ marginRight: 8 }} aria-hidden="true" />
          Sign in with a Google account that has access to the FOTA Drive folder. No sign-in = no uploads.
        </div>
      )}

      {error && (
        <div style={{ padding: "10px 14px", background: "var(--color-background-danger)", border: "0.5px solid var(--color-border-danger)", borderRadius: "var(--border-radius-md)", marginBottom: "1rem", fontSize: 14, color: "var(--color-text-danger)" }}>
          <i className="ti ti-alert-circle" style={{ marginRight: 8 }} aria-hidden="true" />{error}
        </div>
      )}

      <StepBar current={step} />

      {step === 0 && (
        <div>
          <p style={{ margin: "0 0 1rem", fontSize: 14, fontWeight: 500, color: "var(--color-text-secondary)" }}>Step 1 — Select firmware file</p>
          <FileDropZone file={file} onFile={setFile} />
          <div style={{ marginTop: "1.5rem", display: "flex", justifyContent: "flex-end" }}>
            <button disabled={!file || !token} onClick={() => setStep(1)} style={{
              padding: "10px 24px", borderRadius: "var(--border-radius-md)", background: "#185FA5", color: "#fff",
              border: "none", fontWeight: 500, cursor: "pointer", opacity: !file || !token ? 0.5 : 1, display: "flex", alignItems: "center", gap: 6
            }}>
              Next <i className="ti ti-arrow-right" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}

      {step === 1 && (
        <div>
          <p style={{ margin: "0 0 1rem", fontSize: 14, fontWeight: 500, color: "var(--color-text-secondary)" }}>Step 2 — Choose or create a company folder</p>
          <FolderPicker token={token} onSelect={setFolder} selectedFolder={folder} />
          {folder && (
            <div style={{ marginTop: 16, padding: "10px 14px", background: "var(--color-background-success)", border: "0.5px solid var(--color-border-success)", borderRadius: "var(--border-radius-md)", fontSize: 14, display: "flex", alignItems: "center", gap: 8 }}>
              <i className="ti ti-folder-check" style={{ color: "var(--color-text-success)" }} aria-hidden="true" />
              <span>Selected: <strong>{folder.name}</strong></span>
            </div>
          )}
          <div style={{ marginTop: "1.5rem", display: "flex", justifyContent: "space-between" }}>
            <button onClick={() => setStep(0)} style={{ padding: "10px 20px", borderRadius: "var(--border-radius-md)", border: "0.5px solid var(--color-border-secondary)", background: "transparent", color: "var(--color-text-primary)", cursor: "pointer", fontWeight: 500, display: "flex", alignItems: "center", gap: 6 }}>
              <i className="ti ti-arrow-left" aria-hidden="true" /> Back
            </button>
            <button disabled={!folder} onClick={handleUpload} style={{
              padding: "10px 24px", borderRadius: "var(--border-radius-md)", background: "#185FA5", color: "#fff",
              border: "none", fontWeight: 500, cursor: "pointer", opacity: !folder ? 0.5 : 1, display: "flex", alignItems: "center", gap: 6
            }}>
              <i className="ti ti-upload" aria-hidden="true" /> Upload to Drive
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div style={{ textAlign: "center", padding: "2rem 0" }}>
          <i className="ti ti-cloud-upload" style={{ fontSize: 48, color: "#185FA5", display: "block", marginBottom: 16 }} aria-hidden="true" />
          <p style={{ fontWeight: 500, fontSize: 16, marginBottom: 4 }}>Uploading {file?.name}…</p>
          <p style={{ fontSize: 13, color: "var(--color-text-secondary)", marginBottom: 16 }}>To folder: {folder?.name}</p>
          <ProgressBar value={progress} />
          <p style={{ fontSize: 13, color: "var(--color-text-secondary)", marginTop: 8 }}>{progress}%</p>
        </div>
      )}

      {step === 3 && (
        <div>
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--color-background-success)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
              <i className="ti ti-circle-check" style={{ fontSize: 32, color: "var(--color-text-success)" }} aria-hidden="true" />
            </div>
            <h2 style={{ margin: 0, fontWeight: 500, fontSize: 20 }}>Upload complete</h2>
            <p style={{ margin: "4px 0 0", color: "var(--color-text-secondary)", fontSize: 14 }}>{uploadedFile?.name} → {folder?.name}</p>
          </div>

          <div style={{ background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: "var(--border-radius-lg)", padding: "1.25rem" }}>
            <p style={{ margin: "0 0 8px", fontSize: 13, fontWeight: 500, color: "var(--color-text-secondary)" }}>
              <i className="ti ti-link" style={{ marginRight: 6 }} aria-hidden="true" />
              Direct download link for your FOTA app
            </p>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <code style={{ flex: 1, padding: "10px 12px", background: "var(--color-background-secondary)", borderRadius: "var(--border-radius-md)", fontSize: 12, wordBreak: "break-all", display: "block", color: "var(--color-text-primary)" }}>{downloadUrl}</code>
              <button onClick={copyUrl} style={{
                padding: "10px 14px", borderRadius: "var(--border-radius-md)", border: "0.5px solid var(--color-border-secondary)",
                background: copied ? "var(--color-background-success)" : "var(--color-background-primary)", cursor: "pointer",
                color: copied ? "var(--color-text-success)" : "var(--color-text-primary)", flexShrink: 0, transition: "all 0.2s"
              }}>
                <i className={`ti ti-${copied ? "check" : "copy"}`} aria-hidden="true" />
              </button>
            </div>
            <p style={{ margin: "8px 0 0", fontSize: 12, color: "var(--color-text-secondary)" }}>
              Use this URL in your FOTA application to trigger an OTA update. The file is publicly accessible for download.
            </p>
          </div>

          <div style={{ marginTop: "1rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <a href={`https://drive.google.com/drive/folders/${folder?.id}`} target="_blank" rel="noopener noreferrer" style={{
              padding: "10px", borderRadius: "var(--border-radius-md)", border: "0.5px solid var(--color-border-secondary)",
              textAlign: "center", fontSize: 14, color: "var(--color-text-primary)", textDecoration: "none",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 6
            }}>
              <i className="ti ti-folder" aria-hidden="true" /> Open folder in Drive
            </a>
            <button onClick={reset} style={{
              padding: "10px", borderRadius: "var(--border-radius-md)", background: "#185FA5", color: "#fff",
              border: "none", cursor: "pointer", fontSize: 14, fontWeight: 500, display: "flex", alignItems: "center", justifyContent: "center", gap: 6
            }}>
              <i className="ti ti-upload" aria-hidden="true" /> Upload another file
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
