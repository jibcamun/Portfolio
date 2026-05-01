export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div aria-hidden="true" className="route-transition" />
      {children}
    </>
  )
}
