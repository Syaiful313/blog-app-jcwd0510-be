import { PORT } from "./config";
import app from "./app";

app.listen(PORT, () => {
  console.log(`server running on PORT : ${PORT}`);
});
