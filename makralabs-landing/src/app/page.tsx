"use client";

import { useEffect, useRef } from "react";
import { EditorView, basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state";
import { python } from "@codemirror/lang-python";
import { oneDark } from "@codemirror/theme-one-dark";

export default function Home() {
    const editorRef = useRef<HTMLDivElement>(null);

    const codeString = `import asyncio
from makra import Makra
from openai import AsyncOpenAI

makra = Makra(api_key="makra-api-key")
client = AsyncOpenAI(api_key="your-openai-api-key")

async def main():
    repositories_data = await makra.extract(
        urls=["https://www.github.com/ritsource"],
        schema={
            "repositories": [
                {
                    "link": "Link to the repository",
                    "language": "Primary language of the repository",
                    "stars": "Number of stars the repository has",
                    "forks": "Number of forks the repository has"
                }
            ]
        },
    )

    print("Extracted repository data:")
    print(repositories_data)

    response = await client.chat.completions.create(
        model="gpt-4",
        messages=[
            {
                "role": "system",
                "content": "You are a helpful assistant that analyzes GitHub repository data."
            },
            {
                "role": "user",
                "content": f"Based on this repository data: {repositories_data}\n\nWhat are the most popular repositories and what languages do they use?"
            }
        ]
    )

    print("\nAI Analysis:")
    print(response.choices[0].message.content)

if __name__ == "__main__":
    asyncio.run(main())
`;

    useEffect(() => {
        if (!editorRef.current) return;

        const state = EditorState.create({
            doc: codeString,
            extensions: [
                basicSetup,
                python(),
                oneDark,
                EditorView.editable.of(false),
                EditorView.theme({
                    "&": {
                        backgroundColor: "transparent !important",
                        maxHeight: "600px",
                        maxWidth: "600px",
                    },
                    ".cm-scroller": {
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.875rem",
                        overflow: "auto",
                    },
                    ".cm-gutters": {
                        backgroundColor: "transparent",
                        border: "none",
                    },
                }),
            ],
        });

        const view = new EditorView({
            state,
            parent: editorRef.current,
        });

        return () => {
            view.destroy();
        };
    }, []);

    return (
        <>
            <section className="relative min-h-screen flex items-center justify-center px-6">
                <div className="max-w-7xl w-full flex flex-row justify-between gap-12">
                    {/* Left Half - Production Pitch */}
                    <div className="flex-1 flex flex-col justify-center">
                        <h1
                            className="text-5xl font-bold mb-6"
                            style={{
                                fontFamily: "var(--font-cormorant)",
                                color: "var(--makra-foreground-dark)",
                            }}
                        >
                            Web Automation Made Simple
                        </h1>
                        <p
                            className="text-xl mb-8"
                            style={{
                                color: "var(--makra-foreground-dark-100)",
                            }}
                        >
                            Build intelligent web automation tools with natural language.
                            Let AI handle browser interactions while you focus on what matters.
                        </p>
                        <div className="flex gap-4">
                            <button className="makra-web-btn-green px-6 py-3 rounded-md text-base">
                                Get Started
                            </button>
                            <button
                                className="px-6 py-3 rounded-md text-base border-2 transition-colors"
                                style={{
                                    borderColor: "var(--makra-primary-green)",
                                    color: "var(--makra-primary-green)",
                                }}
                            >
                                View Docs
                            </button>
                        </div>
                    </div>

                    {/* Right Half - Code Block */}
                    <div className="flex-1 flex items-center justify-center">
                        <div
                            className="rounded-lg p-6 shadow-lg"
                            style={{
                                backgroundColor: "var(--makra-background-dark-200)",
                                maxWidth: "600px",
                                maxHeight: "600px",
                                overflow: "hidden",
                            }}
                        >
                            <div ref={editorRef} />
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative min-h-screen flex items-center justify-center px-6 border border-red-500">
                <div className="h-full w-full flex flex-col items-center justify-center">
                    <p>Home Page Section 2</p>
                </div>
            </section>
            <section className="relative min-h-screen flex items-center justify-center px-6 border border-red-500">
                <div className="h-full w-full flex flex-col items-center justify-center">
                    <p>Home Page Section 3</p>
                </div>
            </section>
        </>
    );
}
