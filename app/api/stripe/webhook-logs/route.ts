import { NextResponse } from "next/server"
import { WebhookLogger } from "@/lib/webhook-logger"

/**
 * API Route para visualizar logs de webhooks (apenas desenvolvimento)
 */
export async function GET() {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Disponível apenas em desenvolvimento" }, { status: 403 })
  }

  const logger = WebhookLogger.getInstance()
  const logs = logger.getRecentLogs(50)

  return NextResponse.json({
    total: logs.length,
    logs: logs.map((log) => ({
      timestamp: log.timestamp.toISOString(),
      event: log.event,
      processed: log.processed,
      data: log.data,
    })),
  })
}
