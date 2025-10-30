// app/page.tsx
import { supabase } from '../lib/supabaseClient';

export default async function Page() {
  // On tente de lire une table 'media' (tu la créeras ensuite dans Supabase)
  const { data, error } = await supabase
    .from('vehicles')
    .select('id, title, url')

  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        Orion Motors — Espace client
      </h1>

      {error && (
        <p style={{ color: 'red' }}>
          ❌ Erreur Supabase : {error.message}
        </p>
      )}

      {!error && (!data || data.length === 0) && (
        <p>
          ✅ Connexion Supabase réussie !  
          Crée une table <code>media</code> (colonnes : <b>id</b>, <b>title</b>, <b>url</b>) pour voir les
          éléments s’afficher ici.
        </p>
      )}

      {!error && data && data.length > 0 && (
        <ul>
          {data.map((m) => (
            <li key={m.id} style={{ border: '1px solid #ccc', padding: '8px', borderRadius: '6px', marginBottom: '8px' }}>
              <strong>{m.title}</strong> —{' '}
              <a href={m.url} target="_blank" rel="noreferrer">
                {m.url}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
