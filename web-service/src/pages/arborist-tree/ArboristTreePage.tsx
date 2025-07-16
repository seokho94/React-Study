import { Box, Button, TextField, Typography, Paper, Stack } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { Tree } from 'react-arborist';
import type { NodeRendererProps } from 'react-arborist';

// 트리 데이터 타입 정의
type TreeNode = {
  id: string;
  name: string;
  children?: TreeNode[];
};

// react-arborist용 트리 데이터
const treeData: TreeNode[] = [
  {
    id: "root",
    name: "ROOT",
    children: [
      { id: "1", name: "System" },
      { id: "2", name: "Network" },
      {
        id: "3",
        name: "Database",
        children: [
          { id: "db1", name: "DBMS" },
          { id: "db2", name: "PostgreSQL" },
          { id: "db3", name: "MySQL" },
        ],
      },
      {
        id: "4",
        name: "Services",
        children: [
          { id: "s1", name: "Kubernetes" },
          { id: "s2", name: "WMS" },
          { id: "s3", name: "NMS" },
          { id: "s4", name: "SMS" },
        ],
      },
    ],
  },
];

// 샘플 그리드 데이터 및 컬럼 정의
const columns: GridColDef[] = [
  { field: 'group', headerName: '그룹명', width: 180 },
  { field: 'device', headerName: '장비명', width: 180 },
  { field: 'ip', headerName: 'IP', width: 150 },
  { field: 'created', headerName: '생성시간', width: 180 },
  { field: 'updated', headerName: '수정시간', width: 180 },
];

const rows = [
  { id: 1, group: 'DBMS', device: '110.40 PostgreSQL', ip: '192.168.110.40', created: '2024-01-03 15:14', updated: '2024-08-19 15:29' },
  { id: 2, group: 'SMS', device: '110.43 DOFServer 1', ip: '192.168.110.43', created: '2024-01-09 08:17', updated: '2024-08-01 21:21' },
  { id: 3, group: 'NMS', device: '110.44 NMS Server', ip: '192.168.110.44', created: '2024-01-10 10:30', updated: '2024-08-15 14:22' },
  { id: 4, group: 'WMS', device: '110.45 WMS Server', ip: '192.168.110.45', created: '2024-01-12 09:15', updated: '2024-08-18 11:45' },
  { id: 5, group: 'k8s', device: '110.46 Kubernetes', ip: '192.168.110.46', created: '2024-01-15 16:20', updated: '2024-08-20 08:30' },
];

const ArboristTreePage = () => {
  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      {/* 상단 타이틀 및 검색/버튼 영역 */}
      <Typography variant="h5" sx={{ mb: 2 }}>React Arborist Tree + MUIX Data Grid</Typography>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          {/* 검색 입력 */}
          <TextField label="그룹명/장비명/IP 검색" size="small" variant="outlined" />
          {/* 버튼들 */}
          <Button variant="contained">장비추가</Button>
          <Button variant="outlined">장비삭제</Button>
          <Button variant="outlined">관리그룹추가</Button>
        </Stack>
      </Paper>
      {/* 메인 컨텐츠: 좌측 트리, 우측 그리드 */}
      <Box sx={{ display: 'flex', height: 600 }}>
        {/* 좌측 트리 영역 */}
        <Paper sx={{ width: 250, mr: 2, p: 1, overflow: 'auto' }}>
          {/* React Arborist Tree 컴포넌트 */}
          <Tree initialData={treeData}>
            {Node}
          </Tree>
        </Paper>
        {/* 우측 그리드 영역 */}
        <Box sx={{ flex: 1 }}>
          {/* MUIX Data Grid 컴포넌트 */}
          <DataGrid
            rows={rows}
            columns={columns}
            autoHeight
            disableRowSelectionOnClick
            pagination
            initialState={{
              pagination: { paginationModel: { pageSize: 10, page: 0 } }
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

function Node({ node, style, dragHandle }: NodeRendererProps<TreeNode>) {
  /* This node instance can do many things. See the API reference. */
  return (
    <div style={style} ref={dragHandle}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        {node.children && node.children.length > 0 && (
          <span 
            onClick={() => node.toggle()}
            style={{ 
              cursor: 'pointer', 
              fontSize: '12px',
              transition: 'transform 0.2s ease',
              transform: node.isOpen ? 'rotate(90deg)' : 'rotate(0deg)'
            }}
          >
            ▶
          </span>
        )}
        <span>{node.data.name}</span>
      </div>
    </div>
  );
}

export default ArboristTreePage; 