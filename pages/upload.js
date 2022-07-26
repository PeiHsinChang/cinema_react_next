const Upload = () => {
  const onFileUpload = () => console.log("333");
  return (
    <>
      <input type={"file"} onChange={onFileUpload} />
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
