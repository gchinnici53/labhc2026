export function TablaReglamento({
  encabezados,
  filas,
}: {
  encabezados: string[];
  filas: string[][];
}) {
  return (
    <div className="mt-4 overflow-x-auto rounded-lg border border-primario/10">
      <table className="w-full text-left text-sm">
        <thead className="bg-primario/5">
          <tr>
            {encabezados.map((encabezado) => (
              <th key={encabezado} className="px-4 py-2 font-semibold text-primario">
                {encabezado}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filas.map((fila) => (
            <tr key={fila.join("|")} className="border-t border-primario/10">
              {fila.map((celda, indiceCelda) => (
                <td key={indiceCelda} className="px-4 py-2 text-texto/80">
                  {celda}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
