import buildings from "../table";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { ruRU } from '@mui/x-data-grid/locales';
import Container from '@mui/material/Container';

function BuildingsGrid() {
    const rows: GridRowsProp = buildings;
    const columns: GridColDef[] = [
        { field: 'Название', headerName: 'Название аниме', flex: 1.5, minWidth: 150 },
        { field: 'Тип', headerName: 'Тип', flex: 1, minWidth: 120 },
        { field: 'Студия', headerName: 'Студия', flex: 1, minWidth: 120 },
        { field: 'Год', headerName: 'Год выпуска', type: 'number', flex: 0.8, minWidth: 90 },
        { field: 'Серии', headerName: 'Кол-во серий', type: 'number', flex: 0.8, minWidth: 90 },
        { field: 'Рейтинг', headerName: 'Рейтинг', type: 'number', flex: 0.8, minWidth: 90 },
    ];

    return (
        <Container maxWidth="xl" sx={{ height: '600px', mt: '30px', mb: '40px' }}>
            <DataGrid
                localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 20 },
                    },
                }}
                pageSizeOptions={[5, 10, 20]}
                disableRowSelectionOnClick
                slotProps={{
                    toolbar: {
                        showQuickFilter: true,
                    }
                }}
            />
        </Container>
    );
}

export default BuildingsGrid;