"use client"

type MeshAuroraProps = {
  variant?: "light" | "soft" | "dark"
  blobs?: boolean
  grain?: boolean
}

export function MeshAurora({
  variant = "light",
  blobs = true,
  grain = true,
}: MeshAuroraProps) {
  const meshClass =
    variant === "dark"
      ? "aurora-mesh-dark"
      : variant === "soft"
      ? "aurora-mesh-soft"
      : "aurora-mesh"

  return (
    <>
      <div
        aria-hidden="true"
        className={`absolute inset-0 ${meshClass} pointer-events-none`}
      />
      {blobs && (
        <>
          <div
            aria-hidden="true"
            className="aurora-blob bg-sandia/30 w-[420px] h-[420px] -top-32 -left-32 animate-aurora-drift"
            style={{ animationDuration: "20s" }}
          />
          <div
            aria-hidden="true"
            className="aurora-blob bg-celeste/30 w-[380px] h-[380px] top-1/3 -right-32 animate-aurora-drift"
            style={{ animationDuration: "22s", animationDelay: "-6s" }}
          />
        </>
      )}
      {grain && <div aria-hidden="true" className="grain-subtle" />}
    </>
  )
}
