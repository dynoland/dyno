async function run(): Promise<void> {
}

export default {
  name: "run",
  action: run,
  description: "Run scripts",
  options: [{
    name: "-ok, --okay",
    description: "ok",
    config: {
      required: true,
    },
  }],
};
