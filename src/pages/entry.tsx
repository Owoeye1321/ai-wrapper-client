import { useState } from 'react'
import { Input, Modal, Spin } from 'antd'
import './entry.css' // For custom styles
import { askAI } from '../api/ai-wapper.api'

const EntryPoint = () => {
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState<string | null>(null)

  const handleEnter = async () => {
    // Make your request here
    if (!value.trim()) return
    setLoading(true)
    setValue('')
    try {
      const response = await askAI(value)
      setLoading(false)
      setResponse(response)
    } catch (error) {
      console.error('Error fetching AI response:', error)
      setResponse('An error occurred while fetching the response.')
      setLoading(false)
      return
    }
  }
  const handleModalClose = () => setResponse(null)

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div>
          <div>Hey there, ask me anything!</div>
          <br />
          <Input
            className="large-input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onPressEnter={handleEnter}
            placeholder="Type your question..."
            size="large"
          />
          {loading && (
            <div style={{ marginTop: 50 }}>
              <Spin /> <span>Deep thinking...</span>
            </div>
          )}
          <Modal
            open={!!response}
            onCancel={handleModalClose}
            onOk={handleModalClose}
            title="Response"
            footer={null}
          >
            <p>{response}</p>
          </Modal>
        </div>
      </div>
      <footer style={{ marginTop: 'auto', textAlign: 'center', color: '#888', padding: '16px 0' }}>
        <span style={{ fontSize: '12px' }}> &copy;2025 Owoeye Samuel</span>
      </footer>
    </div>
  )
}

export default EntryPoint
