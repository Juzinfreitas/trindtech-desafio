export const CursoTags = ({ cursos, maxVisible = 4 }: { cursos: { nome: string }[], maxVisible?: number }) => {
  const visibleCursos = cursos.slice(0, maxVisible);
  const hiddenCount = cursos.length - maxVisible;

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
      {visibleCursos.map((curso, idx) => (
        <span
          key={idx}
          style={{
            background: '#E5F0FF',
            color: '#2596FF',
            borderRadius: '16px',
            padding: '3px 12px',
            fontSize: '14px',
            fontWeight: 500,
            marginRight: '4px'
          }}
        >
          {curso.nome}
        </span>
      ))}
      {hiddenCount > 0 && (
        <span
          style={{
            background: '#E5F0FF',
            color: '#2596FF',
            borderRadius: '16px',
            padding: '3px 12px',
            fontSize: '14px',
            fontWeight: 500
          }}
        >
          +{hiddenCount}
        </span>
      )}
    </div>
  );
};