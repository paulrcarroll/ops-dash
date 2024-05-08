export function getDefaultLineChartOptions(title: string): any {
  return {
    animationEnabled: true,
    theme: "dark2",
    axisX: {
      valueFormatString: "D MMM"
    },
    axisY: {
      title: "Response Count"
    },
    toolTip: {
      shared: true
    },
    legend: {
      cursor: "pointer"
    }
  }
}

export function getDefaultBarChartOptions(xAxisLabel: string, yAxisLabel: string = 'count'): any {
  return {
    animationEnabled: true,
    theme: "dark2", 
    axisX: {
      title: xAxisLabel,
      reversed: true,
      indexLabelFontSize: 8
    },
    axisY: {
      title: yAxisLabel,
      includeZero: true,
      indexLabelFontSize: 5
    },
    data: [{
      indexLabelFontSize: 8,
      type: "bar",
      indexLabel: "{y}",
      yValueFormatString: "#,###"
    }]
  }
}

export function getDefaultStackedBarChartOptions(title: string): any {
  return {
    animationEnabled: true,
    theme: "dark2",
    axisX: {
      title: "Gateway",
      reversed: true
    },
    axisY: {
      title: "Volume",
      includeZero: true
    },
    data: [{
      type: "stackedBar",
      yValueFormatString: "#,###"
    }]
  }
}

export function getDefaultDonutChartOptions(title: string): any {
  return {
    animationEnabled: true,
    theme: "dark2",
    data: [{
      type: "doughnut",
      yValueFormatString: "#,###",
      indexLabel: "{key}",
      datapoints: []
    }]
  }
}

