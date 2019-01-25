import './requestAnimationFrame'
import 'jest-localstorage-mock'
import 'jest-fetch-mock'
import Adapter from 'enzyme-adapter-react-16'
import Enzyme from 'enzyme'
Enzyme.configure({ adapter: new Adapter() })