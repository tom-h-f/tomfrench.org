"use client";


function rot13(message: string) {
    return message.replace(/[a-z]/gi, letter => String.fromCharCode(letter.charCodeAt(0) + (letter.toLowerCase() <= 'm' ? 13 : -13))).replace("_", "@");
}

export default function ObfuscatedEmail() {

    const obsfucated = "uv_gbzserapu.bet";

    return (
        <span>
            <a href={`mailto:${rot13(obsfucated)}`} className="underline hover:text-foreground/80 transition">
                {rot13(obsfucated)}
            </a>
        </span>
    );
}
