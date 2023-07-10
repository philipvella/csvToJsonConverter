const fs = require("fs");
const csv = require("csv-parser");

describe("CSV to JSON Converter", () => {
  const csvFilePath = "input.csv";
  const jsonFilePath = "output.json";

  test("Converts CSV to JSON and writes to file", (done) => {
    const results = [];

    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => {
        const jsonData = JSON.stringify(results, null, 2);
        fs.writeFile(jsonFilePath, jsonData, (error) => {
          if (error) {
            done.fail("Error writing JSON file: " + error);
          } else {
            expect(fs.existsSync(jsonFilePath)).toBe(true);

            // Read the contents of the JSON file
            const jsonFileContent = fs.readFileSync(jsonFilePath, "utf8");

            // Compare the contents with expected output
            const expectedOutput = JSON.stringify(
              [
                {
                  Name: "John Doe",
                  Age: "25",
                  Email: "johndoe@example.com",
                },
                {
                  Name: "Jane Smith",
                  Age: "30",
                  Email: "janesmith@example.com",
                },
                {
                  Name: "Mark Johnson",
                  Age: "28",
                  Email: "markjohnson@example.com",
                },
                {
                  Name: "Sarah Wilson",
                  Age: "35",
                  Email: "sarahwilson@example.com",
                },
              ],
              null,
              2,
            );
            expect(jsonFileContent).toEqual(expectedOutput);
            done();
          }
        });
      });
  });
});
