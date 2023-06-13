import { Grid } from '@toast-ui/react-grid';
import 'tui-grid/dist/tui-grid.css';

class CustomGrid extends Grid {
    constructor(props) {
      super(props);
      this.handleHeaderClick = this.handleHeaderClick.bind(this);
    }
  
    handleHeaderClick(ev) {
      const { onHeaderClick } = this.props;
      const columnKey = ev.target.getAttribute('data-column-key');
      if (typeof onHeaderClick === 'function') {
        onHeaderClick(columnKey);
      }
    }
  
    bindEvents() {
      super.bindEvents();
      this.eventBus.on('click', this.handleHeaderClick, '.tui-grid-header-cell');
    }
  }
  
  const MyGridComponent = () => {
    const handleHeaderClick = (columnKey) => {
      console.log('Column header clicked:', columnKey);
      // 클릭 이벤트에 대한 추가 동작 구현
    };
  
    return (
      <CustomGrid
        data={[
          // 데이터 설정
          // ...
        ]}
        columns={[
          // 컬럼 설정
          // ...
        ]}
        options={{
          // 그리드 옵션
          // ...
        }}
        onHeaderClick={handleHeaderClick}
      />
    );
  };
  