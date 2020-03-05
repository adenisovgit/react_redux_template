import { connect } from 'react-redux';
import { actions as actionCreators } from './reducers';

export default (mapStateToProps) => (Component) => connect(mapStateToProps,
  actionCreators)(Component);
