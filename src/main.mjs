const statusMessage = document.getElementById("status-message")
statusMessage.innerHTML =
  (crossOriginIsolated ? "🟢" : "🌕") + " WebR Loading…"

import * as Plot from "@observablehq/plot"

import { WebR } from "https://webr.r-wasm.org/latest/webr.mjs"

const webR = new WebR()
await webR.init()

const webRVersion = document.getElementById("webr-version")
webRVersion.innerHTML = await webR.evalRString(`R.version.string`)

statusMessage.innerHTML = (crossOriginIsolated ? "🟢" : "🌕") + " WebR Loaded!"

const numbersDisplay = document.getElementById("numbers-display")
const ojsBarplot = document.getElementById("ojs-barplot")
const plotButton = document.getElementById("update-plot")

async function updatePlot() {
  console.log("HERE")
  const numbers = await webR.evalRRaw(`sample(100, 20)`, "number[]");
  numbersDisplay.innerText = numbers.join(", ");

  ojsBarplot.replaceChildren(
    Plot.plot({
      y: {grid: true},
      style: {
        background: "#202e32",
        color: "#dfdcb9",
      },
      marks: [Plot.rectY(numbers, Plot.binX({y: "count"})), Plot.ruleY([0])],
    })
  )
}

await updatePlot()

plotButton.onclick = updatePlot