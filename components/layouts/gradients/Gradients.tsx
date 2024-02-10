import { BASEURL } from "@/api/utils";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  PromiseLikeOfReactNode,
  Key,
} from "react";
import { VscCopy } from "react-icons/vsc";

const fetchGradients = async () => {
  try {
    const res = await fetch(
      "https://raw.githubusercontent.com/ghosh/uiGradients/master/gradients.json"
    );

    const result = await res.json();

    return result;
  } catch (err) {
    console.log(err);
  }
};

async function Gradients() {
  const result = await fetchGradients();

  console.log(result);

  const gradients = result.map(
    (gradient: {
      name:
        | boolean
        | ReactElement<any, string | JSXElementConstructor<any>>
        | Iterable<ReactNode>
        | PromiseLikeOfReactNode
        | Key
        | null
        | undefined;
      colors: any[];
    }) => (
      <div
        key={gradient.name as any}
        className="h-64 rounded-lg text-sm flex flex-col justify-between items-center bg-black p-4"
      >
        <header className="w-full h-10 font-semibold p-2 flex justify-between items-center">
          <span className="text-[var(--color-headline)]">
            Gradient Name: {gradient.name as any}
          </span>
          <span className="cursor-pointer text-lg text-[var(--color-headline)]">
            <VscCopy />
          </span>
        </header>

        <div>
          <div
            className="rounded-full h-28 w-28"
            style={{
              background: `linear-gradient(to right, ${gradient.colors.join(
                ", "
              )})`,
            }}
          ></div>
        </div>

        <footer className="w-full h-16 text-[var(--color-paragraph)] gap-2 font-semibold p-2 flex justify-between flex-col items-start">
          <div className="flex gap-2">
            {gradient.colors.map((color, index) => (
              <span
                key={index}
                className="rounded-full h-5 w-5"
                style={{ backgroundColor: color }}
              ></span>
            ))}
          </div>

          <div className="flex gap-2">
            {gradient.colors.map((color, index) => (
              <span key={index}>{color}</span>
            ))}
          </div>
        </footer>
      </div>
    )
  );

  return (
    <section className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8">
      {gradients}
    </section>
  );
}

export default Gradients;
