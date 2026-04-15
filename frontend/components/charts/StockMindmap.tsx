'use client'

import { useEffect, useState, useMemo, memo } from 'react'
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
  Handle,
  Position,
  ReactFlowProvider,
} from 'reactflow'
import { IconMaximize, IconX, IconTrendingUp, IconAlertTriangle } from '@tabler/icons-react'

interface StockMindmapProps {
  ticker: string
}

// Custom Node Component with Handles
const CustomNode = memo(({ data }: any) => {
  const { label, score, type, size } = data
  
  const getColor = () => {
    if (type === 'stock') return 'from-blue-500 to-blue-600'
    if (type === 'decision') {
      return score >= 70 ? 'from-green-500 to-green-600' : 'from-red-500 to-red-600'
    }
    if (score >= 70) return 'from-green-400 to-green-500'
    if (score >= 50) return 'from-yellow-400 to-yellow-500'
    return 'from-red-400 to-red-500'
  }

  const getTextSize = () => {
    if (size === 'large') return 'text-2xl'
    if (size === 'medium') return 'text-base'
    return 'text-sm'
  }

  return (
    <div className={`relative px-6 py-4 rounded-2xl bg-gradient-to-br ${getColor()} shadow-2xl border-2 border-white/20`}>
      <Handle 
        type="target" 
        position={Position.Top} 
        id="top"
        className="!w-3 !h-3 !bg-white !border-2 !border-white"
      />
      <Handle 
        type="source" 
        position={Position.Bottom} 
        id="bottom"
        className="!w-3 !h-3 !bg-white !border-2 !border-white"
      />
      
      <div className={` font-bold text-white ${getTextSize()} text-center whitespace-nowrap`}>
        {label}
      </div>
      {score !== undefined && (
        <div className="text-xs text-white/90 text-center mt-1">
          {score}
        </div>
      )}
    </div>
  )
})

CustomNode.displayName = 'CustomNode'

function MindmapFlow({ ticker }: StockMindmapProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)

  const nodeTypes = useMemo(() => ({ custom: CustomNode }), [])

  // CLEAN LAYOUT - 6 nodes only
  const initialNodes: Node[] = useMemo(() => [
    // Top: Stock
    {
      id: 'stock',
      type: 'custom',
      position: { x: 400, y: 20 },
      data: { label: ticker, type: 'stock', size: 'large' },
    },
    // Middle row: 3 main factors
    {
      id: 'fundamentals',
      type: 'custom',
      position: { x: 120, y: 200 },
      data: { label: 'Fundamentals', score: 83, size: 'medium' },
    },
    {
      id: 'macro',
      type: 'custom',
      position: { x: 380, y: 200 },
      data: { label: 'Macro', score: 80, size: 'medium' },
    },
    {
      id: 'earnings',
      type: 'custom',
      position: { x: 640, y: 200 },
      data: { label: 'Earnings', score: 72, size: 'medium' },
    },
    // Bottom row: 2 factors
    {
      id: 'technical',
      type: 'custom',
      position: { x: 220, y: 380 },
      data: { label: 'Technical', score: 60, size: 'medium' },
    },
    {
      id: 'sentiment',
      type: 'custom',
      position: { x: 540, y: 380 },
      data: { label: 'Sentiment', score: 55, size: 'medium' },
    },
    // Final: Decision
    {
      id: 'decision',
      type: 'custom',
      position: { x: 380, y: 540 },
      data: { label: 'BUY', score: 71, type: 'decision', size: 'large' },
    },
  ], [ticker])

  // SIMPLE CONNECTIONS - No duplicates, clear flow
  const initialEdges: Edge[] = useMemo(() => [
    // Stock → 3 main factors
    {
      id: 'e1',
      source: 'stock',
      target: 'fundamentals',
      sourceHandle: 'bottom',
      targetHandle: 'top',
      type: 'smoothstep',
      style: { stroke: '#22c55e', strokeWidth: 3 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#22c55e' },
    },
    {
      id: 'e2',
      source: 'stock',
      target: 'macro',
      sourceHandle: 'bottom',
      targetHandle: 'top',
      type: 'smoothstep',
      style: { stroke: '#22c55e', strokeWidth: 3 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#22c55e' },
    },
    {
      id: 'e3',
      source: 'stock',
      target: 'earnings',
      sourceHandle: 'bottom',
      targetHandle: 'top',
      type: 'smoothstep',
      style: { stroke: '#22c55e', strokeWidth: 3 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#22c55e' },
    },
    // Main factors → Secondary factors
    {
      id: 'e4',
      source: 'fundamentals',
      target: 'technical',
      sourceHandle: 'bottom',
      targetHandle: 'top',
      type: 'smoothstep',
      style: { stroke: '#22c55e', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#22c55e' },
    },
    {
      id: 'e5',
      source: 'earnings',
      target: 'sentiment',
      sourceHandle: 'bottom',
      targetHandle: 'top',
      type: 'smoothstep',
      style: { stroke: '#22c55e', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#22c55e' },
    },
    // Secondary factors → Decision (ONLY these 2, not the main factors again)
    {
      id: 'e6',
      source: 'technical',
      target: 'decision',
      sourceHandle: 'bottom',
      targetHandle: 'top',
      type: 'smoothstep',
      animated: true,
      style: { stroke: '#22c55e', strokeWidth: 3 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#22c55e' },
    },
    {
      id: 'e7',
      source: 'sentiment',
      target: 'decision',
      sourceHandle: 'bottom',
      targetHandle: 'top',
      type: 'smoothstep',
      animated: true,
      style: { stroke: '#22c55e', strokeWidth: 3 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#22c55e' },
    },
    // Macro → Decision (direct path)
    {
      id: 'e8',
      source: 'macro',
      target: 'decision',
      sourceHandle: 'bottom',
      targetHandle: 'top',
      type: 'smoothstep',
      animated: true,
      style: { stroke: '#22c55e', strokeWidth: 3 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#22c55e' },
    },
  ], [])

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false)
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isFullscreen])

  const handleFullscreenToggle = () => {
    setIsFullscreen(prev => !prev)
  }

  // Explanation panel
  const ExplanationPanel = () => (
    <div className="absolute top-4 left-4 z-10 bg-black/90 backdrop-blur-xl border border-green-500/30 rounded-lg p-4 max-w-sm">
      <div className="flex items-center gap-2 mb-3">
        <IconTrendingUp className="w-5 h-5 text-green-400" stroke={1.5} />
        <div className="text-sm font-bold text-white">INSIGHT</div>
      </div>
      <div className="space-y-2 text-xs text-white/80">
        <p>• <span className="text-green-400 font-bold">Green arrows</span> = Positive signals</p>
        <p>• <span className="text-white font-bold">Bigger nodes</span> = More important</p>
        <p>• <span className="text-green-400 font-bold">Animated lines</span> = Final paths</p>
        <p className="pt-2 border-t border-white/10 text-white font-bold">
          All factors → <span className="text-green-400">BUY</span> decision
        </p>
      </div>
    </div>
  )

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-[100] bg-black">
        <div className="relative w-full h-full">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            fitView
            attributionPosition="bottom-left"
            className="bg-black/40"
            minZoom={0.5}
            maxZoom={1.5}
          >
            <Background color="#ffffff" gap={16} size={1} className="opacity-5" />
            <Controls className="bg-white/10 border border-white/20 rounded-lg" />
          </ReactFlow>

          <ExplanationPanel />

          <button
            onClick={handleFullscreenToggle}
            className="absolute top-4 right-4 z-10 p-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-all"
            title="Exit Fullscreen (ESC)"
          >
            <IconX className="w-5 h-5 text-white" stroke={1.5} />
          </button>

          <div className="absolute bottom-4 left-4 z-10 bg-black/80 backdrop-blur-xl border border-white/20 rounded-lg p-4">
            <div className="text-xs font-bold text-white mb-2">SCORE LEGEND</div>
            <div className="space-y-1 text-xs text-white/80">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span>Strong (70+)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span>Neutral (50-69)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span>Weak (&lt;50)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-[600px]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-left"
        className="bg-black/40 rounded-xl"
        minZoom={0.5}
        maxZoom={1.5}
      >
        <Background color="#ffffff" gap={16} size={1} className="opacity-5" />
        <Controls className="bg-white/10 border border-white/20 rounded-lg" />
      </ReactFlow>

      <ExplanationPanel />

      <button
        onClick={handleFullscreenToggle}
        className="absolute top-4 right-4 z-10 p-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-all"
        title="Enter Fullscreen"
      >
        <IconMaximize className="w-5 h-5 text-white" stroke={1.5} />
      </button>

      <div className="absolute bottom-4 left-4 z-10 bg-black/80 backdrop-blur-xl border border-white/20 rounded-lg p-4">
        <div className="text-xs font-bold text-white mb-2">SCORE LEGEND</div>
        <div className="space-y-1 text-xs text-white/80">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>Strong (70+)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span>Neutral (50-69)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span>Weak (&lt;50)</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function StockMindmap({ ticker }: StockMindmapProps) {
  return (
    <ReactFlowProvider>
      <MindmapFlow ticker={ticker} />
    </ReactFlowProvider>
  )
}

