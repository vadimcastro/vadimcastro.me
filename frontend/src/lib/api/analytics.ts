// src/lib/api/analytics.ts
export interface InteractionData {
  interaction_type: string;
  target_id?: string;
  metadata?: Record<string, any>;
}

export async function trackInteraction(
  interaction_type: string,
  target_id?: string,
  metadata?: Record<string, any>
): Promise<void> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
    await fetch(`${apiUrl}/api/v1/analytics/track`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        interaction_type,
        target_id: target_id || 'general',
        metadata: metadata || {},
      }),
    });
  } catch (error) {
    // Non-blocking telemetry tracking
    console.debug('Analytics track interaction error:', error);
  }
}
