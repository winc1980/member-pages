import { NextRequest, NextResponse } from "next/server";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";
import { hookPropertyMap } from "next/dist/server/require-hook";

type RowData = {
  name: string;
  role: string;
  university: string;
  faculty: string;
  isHp: boolean;
  isApp: boolean;
  isHpLeader: boolean;
  isAppLeader: boolean;
};

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!,
      key: process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const doc = new GoogleSpreadsheet(
      "1YTCxR2HjA9XWdYpaTIn9bAoHjdYdBCAlid2V_FY7Jcg",
      serviceAccountAuth
    );

    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows<RowData>();

    const data = rows.map((row) => ({
      name: row.get("name") || "",
      role: row.get("role") || "",
      university: row.get("university") || "",
      faculty: row.get("faculty") || "",
      isHp: row.get("isHp").toLowerCase() === "true",
      isApp: row.get("isApp").toLowerCase() === "true",
      isHpLeader: row.get("isHpLeader").toLowerCase() === "true",
      isAppLeader: row.get("isAppLeader").toLowerCase() === "true",
    }));

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching data from spreadsheet:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
