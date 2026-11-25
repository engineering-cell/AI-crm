/**
 * The notes typed while selling a package or an event, shaped for the customer's Notes tab.
 * They stay stored on the sale itself, so the tab only displays them.
 */
export function saleNotes(enrollments = [], purchases = []) {
  const entry = (record, source, text) => ({
    _id: `sale-${record._id}`,
    source,
    text,
    createdAt: record.createdAt,
  })

  return [
    ...enrollments.map((e) =>
      entry(e, `Package: ${e.package?.packageName || e.label || 'Enrollment'}`, e.package?.notes?.trim()),
    ),
    ...purchases.map((p) => entry(p, `Event / product: ${p.name}`, p.notes?.trim())),
  ].filter((note) => note.text)
}
