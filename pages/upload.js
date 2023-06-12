const Upload = () => {
  const onFileUpload = async (e) => {
    // const selectedFile = document.getElementById("input").files[0];
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target.result;
      console.log(text);
      alert(text);
    };
    reader.readAsText(e.target.files[0]);
  };

  return (
    <>
      <input type={"file"} id={"input"} onChange={(e) => onFileUpload(e)} />
      {/* <Button
        className={"w-100"}
        color="info"
        component="label"
        variant="contained"
      >
        新增附件
        <input
          type={"file"}
          style={{ display: "none" }}
          onChange={onFileUpload}
        />
      </Button> */}
    </>
  );
};

export default Upload;
