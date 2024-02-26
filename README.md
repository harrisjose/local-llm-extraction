# local-llm-extraction

## Setup

You'll need to install ollama and mistral 7b. Then run `npm install` to install the dependencies.

## Usage

Put tweets that you want to use as input in `data.js`. You can skip all the fields except `tweet`.
Run `node index.mjs` to run the script.

## Example Output

```json
{
  "name": "HumbleBean Coffee",
  "location": ["Indirangar"],
  "food": ["Korean cream cheese buns"]
}
```
