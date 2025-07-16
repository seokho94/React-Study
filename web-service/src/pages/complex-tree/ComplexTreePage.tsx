import { Box, Button, TextField, Typography, Paper, Stack } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { UncontrolledTreeEnvironment, Tree, StaticTreeDataProvider } from 'react-complex-tree';
import 'react-complex-tree/lib/style-modern.css';

// react-complex-tree용 계층적 트리 데이터 구조
const treeData = {
  items: {
    root: {
      index: 'root',
      isFolder: true,
      children: ['main-root'],
      data: 'ROOT',
    },
    'main-root': {
      index: 'main-root',
      isFolder: true,
      children: ['system', 'network', 'database'],
      data: 'Root',
    },
    system: {
      index: 'system',
      isFolder: true,
      children: ['k8s', 'wms'],
      data: 'System',
    },
    network: {
      index: 'network',
      isFolder: true,
      children: ['nms', 'sms'],
      data: 'Network',
    },
    database: {
      index: 'database',
      isFolder: true,
      children: ['dbms'],
      data: 'Database',
    },
    k8s: {
      index: 'k8s',
      isFolder: false,
      children: [],
      data: 'Kubernetes',
    },
    wms: {
      index: 'wms',
      isFolder: false,
      children: [],
      data: 'WMS',
    },
    nms: {
      index: 'nms',
      isFolder: false,
      children: [],
      data: 'NMS',
    },
    sms: {
      index: 'sms',
      isFolder: false,
      children: [],
      data: 'SMS',
    },
    dbms: {
      index: 'dbms',
      isFolder: false,
      children: [],
      data: 'DBMS',
    },
  },
};

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
  // ... 추가 데이터
];

const ComplexTreePage = () => {

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      {/* 상단 타이틀 및 검색/버튼 영역 */}
      <Typography variant="h5" sx={{ mb: 2 }}>Prime Tree + MUIX Data Grid</Typography>
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
          {/* primereact Tree 컴포넌트 */}
          <UncontrolledTreeEnvironment
            dataProvider={new StaticTreeDataProvider(treeData.items, (item, data) => ({ ...item, data }))}
            getItemTitle={item => item.data}
            viewState={{}}
          >
            <Tree treeId="tree-1" rootItem="root" treeLabel="그룹 트리" />
          </UncontrolledTreeEnvironment>
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

export default ComplexTreePage; 