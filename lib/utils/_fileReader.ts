type Result = string | ArrayBuffer | null | undefined;
type Cb = (result: Result) => any;
const _fileReader = (file: File, cb?: Cb): Promise<Result> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    try {
      reader.onload = (e) => {
        const result = e.target?.result;
        if (!result) return;
        resolve(result);
        cb?.(result);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      reject(error);
    }
  });

export default _fileReader;
