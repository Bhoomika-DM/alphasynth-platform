'use client'

import { useMemo, memo } from 'react'
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
import 'reactflow/dist/style.css'

interface InferenceMindmapProps {
  data?: any
}

// Custom Node Component - Clean Napkin.ai style
const CustomNode = memo(({ data }: any) => {
  const { label, sublabel, type } = data
  
  const getNodeStyle = () => {
    switch (type) {
      case 'macro':
        return 'bg-[#3B82F6]/10 border-2 border-[#3B82F6]/40 text-[#3B82F6]'
      case 'business':
        return 'bg-[#10B981]/10 border-2 border-[#10B981]/40 text-[#10B981]'
      case 'pvi':
        return 'bg-[#F59E0B]/10 border-2 border-[#F59E0B]/40 text-[#F59E0B]'
      case 'valuation':
        return 'bg-[#8B5CF6]/10 border-2 border-[#8B5CF6]/40 text-[#8B5CF6]'
      case 'verdict':
        return 'bg-[#EF4444]/10 border-2 border-[#EF4444]/40 text-[#EF4444]'
      default:
        return 'bg-[#6B9E5D]/10 border-2 border-[#6B9E5D]/40 text-[#6B9E5D]'
    }
  }

  return (
    <div className={`relative px-5 py-3 rounded-xl ${getNodeStyle()} shadow-sm transition-all hover:shadow-md`}>
      <Handle 
        type="target" 
        position={Position.Top} 
        className="!w-2 !h-2 !bg-[#6B9E5D] !border-2 !border-white"
      />
      <Handle 
        type="source" 
        position={Position.Bottom} 
        className="!w-2 !h-2 !bg-[#6B9E5D] !border-2 !border-white"
      />
      
      <div>
        <div className="text-sm font-bold whitespace-nowrap">{label}</div>
        {sublabel && <div className="text-xs opacity-70 whitespace-nowrap">{sublabel}</div>}
      </div>
    </div>
  )
})

CustomNode.displayName = 'CustomNode'

function InferenceMindmapFlow({ data }: InferenceMindmapProps) {
  const nodeTypes = useMemo(() => ({ custom: CustomNode }), [])

  // Clean 5-level cascade layout with better spacing
  const initialNodes: Node[] = useMemo(() => [
    // Level 1: Macro Drivers (Top row - 3 nodes, well spaced)
    {
      id: 'macro1',
      type: 'custom',
      position: { x: 100, y: 20 },
      data: { label: 'S&P 500 +3.3%', sublabel: 'Positive', type: 'macro' },
    },
    {
      id: 'macro2',
      type: 'custom',
      position: { x: 350, y: 20 },
      data: { label: 'CPI down 5.1', sublabel: 'Positive', type: 'macro' },
    },
    {
      id: 'macro3',
      type: 'custom',
      position: { x: 600, y: 20 },
      data: { label: 'CPI 3.2%±0.2', sublabel: 'Neutral', type: 'macro' },
    },

    // Level 2: Business Drivers (4 nodes, well spaced)
    {
      id: 'business1',
      type: 'custom',
      position: { x: 50, y: 150 },
      data: { label: 'Revenue Growth', sublabel: '+490% YoY', type: 'business' },
    },
    {
      id: 'business2',
      type: 'custom',
      position: { x: 250, y: 150 },
      data: { label: 'Balance Sheet', sublabel: 'D/E=9.44', type: 'business' },
    },
    {
      id: 'business3',
      type: 'custom',
      position: { x: 450, y: 150 },
      data: { label: 'Q4 FY26 Results', sublabel: 'Awaiting', type: 'business' },
    },
    {
      id: 'business4',
      type: 'custom',
      position: { x: 650, y: 150 },
      data: { label: 'Growth Decel.', sublabel: '+5.76%', type: 'business' },
    },

    // Level 3: PVI Impact (1 node - centered)
    {
      id: 'pvi',
      type: 'custom',
      position: { x: 280, y: 280 },
      data: { label: 'Profitability Metrics', sublabel: 'ROE 42.64% | NM 18.62%', type: 'pvi' },
    },

    // Level 4: Valuation Impact (1 node - centered)
    {
      id: 'valuation',
      type: 'custom',
      position: { x: 260, y: 410 },
      data: { label: 'Valuation Multiples', sublabel: 'EV/EBITDA 12.92 | +16.3%', type: 'valuation' },
    },

    // Level 5: Final Verdict (1 node - centered)
    {
      id: 'verdict',
      type: 'custom',
      position: { x: 310, y: 540 },
      data: { label: 'CAUTIOUS BUY', sublabel: 'Monitor headwinds', type: 'verdict' },
    },
  ], [])

  // Clean connections with proper flow
  const initialEdges: Edge[] = useMemo(() => [
    // Macro → Business (all 3 macro to all 4 business)
    { id: 'e1', source: 'macro1', target: 'business1', type: 'smoothstep', style: { stroke: '#6B9E5D', strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#6B9E5D' } },
    { id: 'e2', source: 'macro1', target: 'business2', type: 'smoothstep', style: { stroke: '#6B9E5D', strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#6B9E5D' } },
    { id: 'e3', source: 'macro2', target: 'business2', type: 'smoothstep', style: { stroke: '#6B9E5D', strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#6B9E5D' } },
    { id: 'e4', source: 'macro2', target: 'business3', type: 'smoothstep', style: { stroke: '#6B9E5D', strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#6B9E5D' } },
    { id: 'e5', source: 'macro3', target: 'business3', type: 'smoothstep', style: { stroke: '#6B9E5D', strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#6B9E5D' } },
    { id: 'e6', source: 'macro3', target: 'business4', type: 'smoothstep', style: { stroke: '#6B9E5D', strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#6B9E5D' } },

    // Business → PVI (all 4 business to PVI)
    { id: 'e7', source: 'business1', target: 'pvi', type: 'smoothstep', style: { stroke: '#6B9E5D', strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#6B9E5D' } },
    { id: 'e8', source: 'business2', target: 'pvi', type: 'smoothstep', style: { stroke: '#6B9E5D', strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#6B9E5D' } },
    { id: 'e9', source: 'business3', target: 'pvi', type: 'smoothstep', style: { stroke: '#6B9E5D', strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#6B9E5D' } },
    { id: 'e10', source: 'business4', target: 'pvi', type: 'smoothstep', style: { stroke: '#6B9E5D', strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#6B9E5D' } },

    // PVI → Valuation
    { id: 'e11', source: 'pvi', target: 'valuation', type: 'smoothstep', animated: true, style: { stroke: '#6B9E5D', strokeWidth: 3 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#6B9E5D' } },

    // Valuation → Verdict
    { id: 'e12', source: 'valuation', target: 'verdict', type: 'smoothstep', animated: true, style: { stroke: '#EF4444', strokeWidth: 3 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#EF4444' } },
  ], [])

  const [nodes, , onNodesChange] = useNodesState(initialNodes)
  const [edges, , onEdgesChange] = useEdgesState(initialEdges)

  return (
    <div className="relative w-full h-[600px] bg-white rounded-xl border-2 border-[#6A994E]/10">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-right"
        className="bg-[#F4F7F2]"
        minZoom={0.5}
        maxZoom={1.5}
        nodesDraggable={true}
        nodesConnectable={false}
        elementsSelectable={true}
      >
        <Background color="#6B9E5D" gap={20} size={1} className="opacity-10" />
        <Controls className="bg-white border border-[#6A994E]/20 rounded-lg" />
      </ReactFlow>

      {/* Legend */}
      <div className="absolute top-4 right-4 bg-white border border-[#6A994E]/20 rounded-lg p-4 shadow-sm">
        <div className="text-xs font-bold text-[#1F2933] mb-3 uppercase tracking-wider">Legend</div>
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-[#3B82F6]/20 border border-[#3B82F6]/40"></div>
            <span className="text-[#6B7280]">Macro Drivers</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-[#10B981]/20 border border-[#10B981]/40"></div>
            <span className="text-[#6B7280]">Business Drivers</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-[#F59E0B]/20 border border-[#F59E0B]/40"></div>
            <span className="text-[#6B7280]">PVI Impact</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-[#8B5CF6]/20 border border-[#8B5CF6]/40"></div>
            <span className="text-[#6B7280]">Valuation</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-[#EF4444]/20 border border-[#EF4444]/40"></div>
            <span className="text-[#6B7280]">Final Verdict</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function InferenceMindmap({ data }: InferenceMindmapProps) {
  return (
    <ReactFlowProvider>
      <InferenceMindmapFlow data={data} />
    </ReactFlowProvider>
  )
}
