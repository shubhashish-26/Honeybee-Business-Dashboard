function Loading() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "300px",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          width: "60px",
          height: "60px",
          border: "8px solid #ddd",
          borderTop: "8px solid #1976D2",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      ></div>

      <p style={{ marginTop: "20px", fontSize: "18px" }}>
        Loading Hospitals...
      </p>

      <style>
        {`
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  );
}

export default Loading;