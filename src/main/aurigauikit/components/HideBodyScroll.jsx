import { useEffect } from 'react'

const HideBodyScroll = () => {
  useEffect(() => {
    const overflowStyle = document.createElement('style')
    const transitonStyle = document.createElement('style')
    overflowStyle.innerHTML = `
      body { 
          overflow: hidden !important; 
          padding-right: 17px !important; 
      } 
      .ant-layout-header{ 
          padding-right: 17px !important;
      } 
    `
    transitonStyle.innerHTML = `
      .ant-layout-header{ 
          transition:none !important;
      } 
      .ant-layout-content{
          transition:none !important;
      }
    `
    document.head.appendChild(overflowStyle)
    document.head.appendChild(transitonStyle)
    return () => {
      document.head.removeChild(overflowStyle)
      setTimeout(() => document.head.removeChild(transitonStyle), 0)
    }
  }, [])
  return null
}

export default HideBodyScroll
