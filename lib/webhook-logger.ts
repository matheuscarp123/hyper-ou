/**
 * Logger para webhooks do Stripe
 * Ajuda a debugar e monitorar eventos
 */

export class WebhookLogger {
  private static instance: WebhookLogger
  private logs: Array<{
    timestamp: Date
    event: string
    data: any
    processed: boolean
  }> = []

  public static getInstance(): WebhookLogger {
    if (!WebhookLogger.instance) {
      WebhookLogger.instance = new WebhookLogger()
    }
    return WebhookLogger.instance
  }

  public logEvent(event: string, data: any, processed = true) {
    const log = {
      timestamp: new Date(),
      event,
      data,
      processed,
    }

    this.logs.push(log)

    // Manter apenas os últimos 100 logs
    if (this.logs.length > 100) {
      this.logs.shift()
    }

    // Log no console em desenvolvimento
    if (process.env.NODE_ENV === "development") {
      console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
      console.log(`📦 Webhook Event: ${event}`)
      console.log(`⏰ Timestamp: ${log.timestamp.toISOString()}`)
      console.log(`✅ Processed: ${processed ? "Yes" : "No"}`)
      console.log("📋 Data:", JSON.stringify(data, null, 2))
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n")
    }
  }

  public getRecentLogs(limit = 10) {
    return this.logs.slice(-limit)
  }

  public getEventCount(eventType: string): number {
    return this.logs.filter((log) => log.event === eventType).length
  }

  public clearLogs() {
    this.logs = []
  }
}
