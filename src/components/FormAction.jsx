export default function FormAction({
  handleSubmit,
  type = "Button",
  action = "submit",
  text,
}) {
  return (
    <>
      {type === "Button" ? (
        <button
          type={action}
          className="transition-colors duration-500 ease-in-out bg-white hover:bg-green-100 hover:border-green-100 text-sm border text-black py-2 px-4 rounded-md"
          onSubmit={handleSubmit}
        >
          {text}
        </button>
      ) : (
        <></>
      )}
    </>
  );
}
