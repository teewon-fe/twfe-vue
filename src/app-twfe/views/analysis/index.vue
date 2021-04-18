<template>
  <div class="tw-report">
    <div class="tw-report-topline">&nbsp;</div>
    <div class="tw-report-inner">
      <div class="tw-report-header">
        <div class="tw-report-header-logo">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHwAAAAkCAYAAABLw14kAAAACXBIWXMAAC4jAAAuIwF4pT92AAA54WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMwNjcgNzkuMTU3NzQ3LCAyMDE1LzAzLzMwLTIzOjQwOjQyICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIgogICAgICAgICAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgICAgICAgICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIj4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNSAoV2luZG93cyk8L3htcDpDcmVhdG9yVG9vbD4KICAgICAgICAgPHhtcDpDcmVhdGVEYXRlPjIwMTgtMDEtMThUMDg6MDQ6MzgrMDg6MDA8L3htcDpDcmVhdGVEYXRlPgogICAgICAgICA8eG1wOk1vZGlmeURhdGU+MjAxOC0wMS0xOFQxNDo0Nzo1MCswODowMDwveG1wOk1vZGlmeURhdGU+CiAgICAgICAgIDx4bXA6TWV0YWRhdGFEYXRlPjIwMTgtMDEtMThUMTQ6NDc6NTArMDg6MDA8L3htcDpNZXRhZGF0YURhdGU+CiAgICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2UvcG5nPC9kYzpmb3JtYXQ+CiAgICAgICAgIDxwaG90b3Nob3A6Q29sb3JNb2RlPjM8L3Bob3Rvc2hvcDpDb2xvck1vZGU+CiAgICAgICAgIDx4bXBNTTpJbnN0YW5jZUlEPnhtcC5paWQ6Y2M4Zjk5MTgtODJkMi05ZDRlLTk1NDYtZDIyMzJiNzRiYWY2PC94bXBNTTpJbnN0YW5jZUlEPgogICAgICAgICA8eG1wTU06RG9jdW1lbnRJRD54bXAuZGlkOjZmYTg1ODZmLTZkMTAtY2U0My1iNjhhLWI4MzZiNTY4YWQxNjwveG1wTU06RG9jdW1lbnRJRD4KICAgICAgICAgPHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD54bXAuZGlkOjZmYTg1ODZmLTZkMTAtY2U0My1iNjhhLWI4MzZiNTY4YWQxNjwveG1wTU06T3JpZ2luYWxEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06SGlzdG9yeT4KICAgICAgICAgICAgPHJkZjpTZXE+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPmNyZWF0ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDo2ZmE4NTg2Zi02ZDEwLWNlNDMtYjY4YS1iODM2YjU2OGFkMTY8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMTgtMDEtMThUMDg6MDQ6MzgrMDg6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1IChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPnNhdmVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6Y2M4Zjk5MTgtODJkMi05ZDRlLTk1NDYtZDIyMzJiNzRiYWY2PC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDE4LTAxLTE4VDE0OjQ3OjUwKzA4OjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNSAoV2luZG93cyk8L3N0RXZ0OnNvZnR3YXJlQWdlbnQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpjaGFuZ2VkPi88L3N0RXZ0OmNoYW5nZWQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICA8L3JkZjpTZXE+CiAgICAgICAgIDwveG1wTU06SGlzdG9yeT4KICAgICAgICAgPHRpZmY6T3JpZW50YXRpb24+MTwvdGlmZjpPcmllbnRhdGlvbj4KICAgICAgICAgPHRpZmY6WFJlc29sdXRpb24+MzAwMDAwMC8xMDAwMDwvdGlmZjpYUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6WVJlc29sdXRpb24+MzAwMDAwMC8xMDAwMDwvdGlmZjpZUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6UmVzb2x1dGlvblVuaXQ+MjwvdGlmZjpSZXNvbHV0aW9uVW5pdD4KICAgICAgICAgPGV4aWY6Q29sb3JTcGFjZT42NTUzNTwvZXhpZjpDb2xvclNwYWNlPgogICAgICAgICA8ZXhpZjpQaXhlbFhEaW1lbnNpb24+MTI0PC9leGlmOlBpeGVsWERpbWVuc2lvbj4KICAgICAgICAgPGV4aWY6UGl4ZWxZRGltZW5zaW9uPjM2PC9leGlmOlBpeGVsWURpbWVuc2lvbj4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgCjw/eHBhY2tldCBlbmQ9InciPz7vZzjuAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAABlRSURBVHja5Hx5lGVFmecvlru//eVauVUltWRRK1VAlQI20KIwuOG0Iz3qONp2q4yOHh1txRaGRtCG8Rx1dHp66DljO3BQj55ubGSRbmAAtaSoohZqzarMyvXl8jLfft/dImL+eJlVmUmhVVmoHIk8cU7mvRHfjbhffNvv+26SfdM/27E+feX/kJAZoaKAgCgsoxFCdEa0cKi8/8tFP/dDjekghOJY/0Wo1kw4loRj8ta1bYnbVrY4N+qcJgEEy3gUA0DHCvX9A5PV/2Zq7KdD0zWU3ACcUSy3+aHEyhYHbSkTQaSglMLQdA1VL4TGKdpTNiglYIRgx5oMdN541lC+hkdeHEfS1uGHApV6BKkU1rTH0ZGxEUQSlBD4oYAfChwbr4AxgrVtcbSnLeRmFWCcRKZpCCIyIVSIuN4EnZrwoioyVgc8UUPeHYZQITSmY7i6D9es+AgSegvK9RB7Bwt4abiIaza2ouxGaE7oyMYMMEYx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">
          <h3>Front End Team</h3>
        </div>

        <div class="tw-report-header-title">
          <h4>前端日报</h4>
          <div>团队现有成员: {{$api.user.count.data.count}}</div>
          <div>统计日期: {{$ui.dateFormat($api.global.time.data.time, 'yyyy-mm-dd')}}</div>
        </div>

        <div class="tw-report-header-title xsub">
          <h4>
            <i class="tw-ico xproject dt-n1"></i>
            <span>项目统计</span>
          </h4>
          <div>进行中的项目: {{projects.length}}</div>
          <div>有风险的项目: {{riskyProjects.length}}</div>
        </div>

        <div class="tw-report-header-title xsub">
          <h4>
            <i class="tw-ico xspeed dt-n1"></i>
            <span>本月工时</span>
          </h4>
          <div>已排期工时: {{$api.project.mounthTaskTime.data.totalTime}}(人天)</div>
          <div>
            <span>月度总进度：</span>
            <el-progress v-if="$api.project.mounthTaskTime.data.totalTime > 0" style="display: inline-block; width: 100px;" :percentage="parseInt($api.project.mounthProgress.data.totalProgress / $api.project.mounthTaskTime.data.totalTime * 100)" color="#218fff"></el-progress>
          </div>
        </div>

        <div class="tw-report-header-time">
          <span>2021 牛年快乐</span>
        </div>
      </div>

      <h3 class="tw-report-title">问题与风险</h3>

      <div class="tw-repoert-body">
        <table class="tw-table">
          <thead>
            <tr>
              <th style="width: 5em; text-align: left;">序号</th>
              <th style="text-align: left;">问题描述</th>
              <!-- <th style="width: 160px; text-align: left;">所属项目</th> -->
              <th style="width: 7em; text-align: left;">问题创建人</th>
              <th style="width: 10em; text-align: left;">问题处理人</th>
              <th style="width: 10em; text-align: left;">需解决时间</th>
              <th style="width: 5em; text-align: left;">状态</th>
              <th style="width: 300px;">备注</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(issue,idx) in $api.kpi.issues.data.list" :key="issue.id">
              <td>{{idx + 1}}</td>
              <td>{{issue.descript}}</td>
              <!-- <td>{{issue.project_name}}</td> -->
              <td>{{issue.create_developer}}</td>
              <td>{{issue.handle_developer}}</td>
              <td>{{$ui.dateFormat(issue.resolve_time, 'yyyy-mm-dd')}}</td>
              <td>{{issue.stauts==='done'?'已完成':'进行中'}}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="tw-report-title">进行中的项目及进度</h3>

      <div class="tw-repoert-body">
        <table class="tw-table">
          <thead>
            <tr>
              <th style="width: 5em; text-align: left;">序号</th>
              <th style="text-align: left;">项目名称</th>
              <th style="width: 10em; text-align: left;">负责人</th>
              <th style="width: 180px; text-align: left;">进度</th>
              <th style="width: 10em; text-align: left;">总工时(人/天)</th>
              <!-- <th style="width: 7em;">项目状态</th> -->
              <th style="width: 15em; text-align: left;">下一里程碑</th>
              <!-- <th style="width: 6em;">操作</th> -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="(project,idx) in projects"
              :key="project.id">
              <td>{{idx+1}}</td>
              <td>
                <router-link :to="`/project-detail?id=${project.id}`" class="text-link">{{project.project_name}}</router-link>
              </td>
              <td>{{project.project_leader_name}}</td>
              <td class="pr-huge">
                <el-progress :percentage="project.progress || 0" :color="project.status==='risky'?'#f56c6c':'#218fff'"></el-progress>
              </td>
              <td>{{project.task_time}}</td>
              <!-- <td>{{project.status}}</td> -->
              <td>{{project.next_time_node.text}}</td>
              <!-- <td>
                <a v-if="project.status!=='已完成'" class="text-link" @click="$api.project.close.send({id:project.id, status: 'done'}).then(()=>{$api.project.getProjects.send()})">关闭项目</a>
                <a v-else class="text-link" @click="$api.project.close.send({id:project.id, status: 'doing'}).then(()=>{$api.project.getProjects.send()})">开启项目</a>
              </td> -->
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="tw-report-title">前端青云榜<span class="text-secondary">(周榜)</span></h3>

      <ul class="tw-rank">
        <li class="tw-rank-item"
          v-for="(developer, idx) in $api.kpi.list.data.list"
          :key="developer.id">
          <div class="tw-rank-developer">
            <img v-if="idx === 0" src="./images/n1.png" />
            <img v-else-if="idx === 1" src="./images/n2.png" />
            <img v-else-if="idx === 2" src="./images/n3.png" />
            <i v-else class="tw-rank-no">{{idx+1}}</i>
            <h4>{{developer.user_name}}<span class="tw-rank-score">(230分)</span></h4>
            <i class="tw-rank-item-no" :class="[`xno${idx}`]">{{['榜首','榜眼','探花'][idx]}}</i>
          </div>

          <div class="tw-rank-progress-text">{{developer.doneTaskTime}} / {{developer.workdays}}(人天)</div>

          <div class="tw-rank-progress">
            <!-- <el-progress :percentage="project.progress" :format="format" :color="project.status==='risky'?'#f56c6c':'#218fff'"></el-progress> -->
            <el-progress :show-text="false" :stroke-width="8" :percentage="developer.progress" color="#c79118"></el-progress>
          </div>

          <div class="tw-rank-scoreitem">
            <label>完成工作量：</label>
            <span class="tw-rank-scoreitem-num">+90分</span>
          </div>

          <div class="tw-rank-scoreitem">
            <label>转测延期天数：</label>
            <span class="tw-rank-scoreitem-num">+20分</span>
          </div>

          <div class="tw-rank-scoreitem">
            <label>普通Bug数：</label>
            <span class="tw-rank-scoreitem-num">-10分</span>
          </div>

          <div class="tw-rank-scoreitem">
            <label>红线Bug数：</label>
            <span class="tw-rank-scoreitem-num">-20分</span>
          </div>

          <div class="tw-rank-scoreitem">
            <label>代码规范性：</label>
            <span class="tw-rank-scoreitem-num">-10分</span>
          </div>

          <div class="tw-rank-scoreitem">
            <label>需求评审：</label>
            <span class="tw-rank-scoreitem-num">-20分</span>
          </div>

          <div class="tw-rank-scoreitem">
            <label>工作进度提交：</label>
            <span class="tw-rank-scoreitem-num">-10分</span>
          </div>

          <div class="tw-rank-scoreitem">
            <label>未及时处理的问题单：</label>
            <span class="tw-rank-scoreitem-num">-20分</span>
          </div>

          <div class="tw-rank-scoreitem">
            <label>攻关性任务：</label>
            <span class="tw-rank-scoreitem-num">+10分</span>
          </div>

          <div class="tw-rank-scoreitem">
            <label>组内优化单：</label>
            <span class="tw-rank-scoreitem-num">+7.5分</span>
          </div>

          <div class="tw-rank-scoreitem">
            <label>遗留问题优化：</label>
            <span class="tw-rank-scoreitem-num">+10分</span>
          </div>

          <div class="tw-rank-scoreitem">
            <label></label>
            <span class="tw-rank-scoreitem-num"></span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'page-analysis',

  computed: {
    projects () {
      return this.$api.project.getProjects.data.list.map(item => {
        return item.project
      })
    },

    riskyProjects () {
      return this.projects.filter(item => item.status === 'risky')
    }
  },

  created () {
    const ym = this.$route.query.ym || `${this.$cnt.TIME_CUR_YEAR}-${this.$cnt.TIME_CUR_MONTH}`
    const userGroup = this.$app.user.userGroup || this.$ui.urlQuery.userGroup

    this.$api.project.getProjects.reset().send({
      status: 'doing',
      pageNo: '',
      pageSize: ''
    })

    this.$api.user.count.reset().send({
      groupId: userGroup
    })

    this.$api.global.time.send()
    this.$api.project.mounthTaskTime.send({ ym })
    this.$api.project.mounthProgress.send({ ym })
    this.$api.kpi.list.send({ ym, user_group: userGroup })
    this.$api.kpi.issues.send({ type: 'risk' })
  }
}
</script>

<style lang="scss">
  .tw-report-topline {
    width: 1240px;
    font-size: 0;
  }

  .tw-report-inner {
    width: 1240px;
    padding: 20px;
    background: #f5f5f5;
  }

  .tw-report-header {
    position: relative;
    display: flex;
    align-items: center;
    height: 180px;
    padding: 0 20px;
    color: #d2d4c2;
    background: #02002f url("./images/bg.png") no-repeat center center / 100% 100%;
  }

  .tw-report-header-logo {
    position: relative;
    width: 140px;
    height: 140px;
    padding: 40px 0;
    background: #7986cb;
    color: #fff;
    text-align: center;
    border-radius: 50%;
  }

  .tw-report-header-logo > img {
    border-top-left-radius: 50%;
  }

  .tw-report-header-logo > h3 {
    padding-left: 34px;
    font-size: 12px;
    white-space: nowrap;
  }

  .tw-report-header-title {
    line-height: 1.7;
    margin-left: 20px;
  }

  .tw-report-header-title > h4 {
    font-size: 25px;
    color: #ead8af;
  }

  .tw-report-header-title.xsub {
    line-height: 1.4;
    margin-left: 250px;
  }

  .tw-report-header-title.xsub > h4 {
    font-size: 18px;
    color: #fff;
  }

  .tw-report-header .el-progress__text {
    color: #fff;
  }

  .tw-report-header-time {
    position: absolute;
    right: 10px;
    bottom: 10px;
    color: #fff;
  }

  .tw-report-title {
    padding: 15px 0;
    font-size: 22px;
  }

  .tw-repoert-body {
    padding: 20px;
    background: #ffffff;
  }

  .tw-rank {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -0.5%;
  }

  .tw-rank-item {
    position: relative;
    width: 32%;
    padding: 15px;
    margin: 0 0.66% 15px;
    background: #fff;
    border-radius: 5px;
    overflow: hidden;
  }

  .tw-rank-item-no {
    position: absolute;
    right: -80px;
    width: 200px;
    height: 20px;
    color: #fff;
    text-align: center;
    font-style: normal;
    font-size: 12px;
    font-weight: bold;
    letter-spacing: .5em;
    transform: rotate(45deg);
  }

  .tw-rank-item-no.xno0 {
    background: #ffb600;
  }

  .tw-rank-item-no.xno1 {
    background: #b4c4ce;
  }

  .tw-rank-item-no.xno2 {
    background: #ed8d35;
  }

  .tw-rank-developer {
    margin-bottom: 10px;
    text-align: center;
  }

  .tw-rank-developer > img {
    height: 30px;
    margin-right: 10px;
    border-radius: 5px;
  }

  .tw-rank-developer > h4 {
    display: inline-block;
    font-size: 18px;
    font-weight: bold;
    vertical-align: middle;
  }

  .tw-rank-no {
    display: inline-block;
    width: 25px;
    height: 25px;
    line-height: 25px;
    margin-right: 10px;
    text-align: center;
    font-size: 16px;
    font-style: normal;
    font-weight: bold;
    background: #f7cd92;
    color: #fff;
    vertical-align: middle;
    border-radius: 6px;
  }

  .tw-rank-progress {
    margin-bottom: 10px;
  }

  .tw-rank-progress-text {
    margin-bottom: 5px;
    font-size: 12px;
    color: #666;
  }

  .tw-rank-scoreitem {
    display: inline-flex;
    width: 47%;
    margin-bottom: 5px;
    color: #4f5d79;
    justify-content: space-between;
    font-size: 12px;
  }

  .tw-rank-scoreitem:nth-child(2n) {
    margin-right: 3%;
  }

  .tw-rank-scoreitem:nth-child(2n + 1) {
    margin-left: 3%;
  }

  .tw-rank-scoreitem-num {
    color: #8b97af;
  }

  .tw-rank-score {
    font-size: 20px;
    color: #d39400;
    font-weight: 400;
    text-align: center;
  }
</style>
