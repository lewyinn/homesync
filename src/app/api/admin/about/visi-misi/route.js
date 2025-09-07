import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataPath = path.join(process.cwd(), "src", "data", "about", "visimisi.json");

function ensureFile() {
    const dir = path.dirname(dataPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    if (!fs.existsSync(dataPath)) {
        fs.writeFileSync(
            dataPath,
            JSON.stringify(
                {
                    visi: [
                        {
                            title: "",
                            desc: ""
                        }
                    ],
                    misi: [
                        {
                            title: "",
                            badges: []
                        }
                    ]
                },
                null,
                2
            )
        );
    }
}

export async function GET() {
    try {
        ensureFile();
        const raw = fs.readFileSync(dataPath, "utf-8");
        return NextResponse.json(JSON.parse(raw || "{}"), { status: 200 });
    } catch (e) {
        return NextResponse.json({ error: "Failed to read visimisi.json" }, { status: 500 });
    }
}

export async function PUT(req) {
    try {
        const body = await req.json();
        fs.writeFileSync(dataPath, JSON.stringify(body, null, 2));
        return NextResponse.json({ ok: true });
    } catch (e) {
        return NextResponse.json({ error: "Failed to save visimisi.json" }, { status: 500 });
    }
}