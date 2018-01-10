import $ from 'jquery';
import { ContainerBuilder } from 'react-habitat';

class CustomContainerBuilder extends ContainerBuilder {
  /** Register component if it is present in html. */
  registerIfPresent(componentImportFunc, componentName) {
    const $components = $(`[data-component="${componentName}"]`);

    if (!$components.length) {
      return;
    }

    const componentPromise = componentImportFunc();
    this.registerAsync(componentPromise).as(componentName);
  }
}

export default CustomContainerBuilder;
