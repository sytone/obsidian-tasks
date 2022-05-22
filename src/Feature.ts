export type FeatureFlag = {
    [internalName: string]: boolean;
};

/**
 * @todo documentation
 *
 * @since {date}
 */
export class Feature {
    static readonly TASK_STATUS_MENU = new Feature(
        'TASK_STATUS_MENU',
        0,
        'Enables a right click menu for each task to allow you to select the task Status from the available next transition states.',
        'Task Status Menu',
        false,
        false,
    );

    static get values(): Feature[] {
        return [this.TASK_STATUS_MENU];
    }

    static get settingsFlags(): FeatureFlag {
        const featureFlags: { [internalName: string]: boolean } = {};

        Feature.values.forEach((feature) => {
            featureFlags[feature.internalName] = feature.enabledByDefault;
        });
        return featureFlags;
    }

    /**
     * Converts a string to its corresponding default Feature instance.
     *
     * @param string the string to convert to Feature
     * @throws RangeError, if a string that has no corresponding Feature value was passed.
     * @returns the matching Feature
     */
    static fromString(string: string): Feature {
        const value = (this as any)[string];
        if (value) {
            return value;
        }

        throw new RangeError(
            `Illegal argument passed to fromString(): ${string} does not correspond to any available Feature ${
                (this as any).prototype.constructor.name
            }`,
        );
    }

    private constructor(
        public readonly internalName: string,
        public readonly index: number,
        public readonly description: string,
        public readonly displayName: string,
        public readonly enabledByDefault: boolean,
        public readonly stable: boolean,
    ) {}

    /**
     * Called when converting the Feature value to a string using JSON.Stringify.
     * Compare to the fromString() method, which deserializes the object.
     */
    public toJSON() {
        return this.internalName;
    }
}