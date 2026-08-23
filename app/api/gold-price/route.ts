import { NextResponse } from "next/server";
import { getGoldPrice } from "@/lib/goldPrice";

export async function GET() {
  const data = await getGoldPrice();
  return NextResponse.json(data);
}