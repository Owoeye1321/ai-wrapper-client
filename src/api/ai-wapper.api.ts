import { AI_WRAPPER_BASE_URL } from '../config/environment-variable.config'
import axios from 'axios'

// ai-wrapper.api.ts
export async function askAI(prompt: string): Promise<string> {
  try {
    const response = await axios.post(
      `${AI_WRAPPER_BASE_URL}/ai-wrapper/prompt`,
      { question: prompt },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    console.log(response.data)
    return response.data.data
  } catch (error) {
    return (error as any)?.response?.data.message
  }
}
